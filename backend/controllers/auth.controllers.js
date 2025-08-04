import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import { envVars } from "../utils/envVars.js";
import { generateResetToken } from "../utils/generateResetToken.js";
import crypto from "crypto";




const client = new OAuth2Client(envVars.googleClientId);

export const registerUser = async (req, res) => {
  const { username, email, password ,confirmedPassword ,isApproveToPolicy} = req.body;
 
  try {
    if (!username || !email || !password || !confirmedPassword || !isApproveToPolicy) {
      return res.status(400).json({ message: "All fields are required" ,success:false});
    }
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists",success:false });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" ,success:false});
    }
    // Hash the password and save the user
    if (password.length < 8) {  //TODO increment this condition
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" ,success:false});
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return res
        .status(400)
        .json({ message: "Username can only contain alphanumeric characters" ,success:false});
    }
    if (!/^[a-zA-Z\s]+$/.test(username)) {
      return res
        .status(400)
        .json({ message: "Name can only contain letters and spaces",success:false });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" ,success:false});
    }
    /*   if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" });
        } */
    if(password !== confirmedPassword){
      return res.status(400).json({ message: "Passwords do not match",success:false });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    return res.status(201).json({ message: "User registered successfully" ,success:true});
  } catch (error) {
    console.error("Error registering user controller:", error);
    return res.status(500).json({ message: "Internal server error" ,success:false});
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" ,success:false});
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" ,success:false});
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" ,success:false});
    }
    generateTokenAndSetCookies(user._id, res);
    return res.status(200).json({ message: "Login successful", user,success:true });
  } catch (error) {
    console.error("Error logging in user controller:", error);
    return res.status(500).json({ message: "Internal server error" ,success:false});
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" ,success:false});

  const { token, hashedToken } = generateResetToken();
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 5 * 60 * 1000;
  await user.save();

  const resetLink = `${envVars.clientUrl}/reset-password/${token}`;
  return res.status(200).json({ success: true, resetLink }); // frontend will send via EmailJS
};

export const resetPassword = async (req, res) => {
  try {
    
    const { token } = req.params;
    const { password } = req.body;
  
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now()},
    });
  
    if (!user) return res.status(400).json({ message: "Invalid or expired token" ,success:false});
  
    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();
  
    return res.json({ success: true, message: "Password reset successful" ,success:true});
  } catch (error) {
    console.error("Error resetting password controller:", error);
    return res.status(500).json({ message: "Internal server error" ,success:false});
    
  }
};



export const googleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    // 1. Verify token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: envVars.googleClientId,
    });

    const { email_verified, name, email, picture } = ticket.getPayload();

    // 2. Check if user is verified
    if (!email_verified)
      return res.status(403).json({ message: "Email not verified" });

    // 3. Check if user exists
    let user = await User.findOne({ email });

    // 4. If not, create new user
    if (!user) {
      user = await User.create({
        name,
        email,
        isVerified: true,
        socialLogin: true,
        profile: { avatar: picture },
        role: "consumer",
      });
    }
    generateTokenAndSetCookies(user._id, res);
    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Google login controller error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};

export const googleSignup = async (req, res) => {
  try {
    const { idToken, role } = req.body;

    if (!role || !["consumer", "supplier"].includes(role)) {
      return res.status(400).json({ message: "Invalid or missing field" });
    }

    const ticket = await client.verifyIdToken({
      idToken,
      audience: envVars.googleClientId,
    });

    const { email_verified, name, email, picture } = ticket.getPayload();

    if (!email_verified) {
      return res.status(403).json({ message: "Email not verified by Google" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists, please log in" });
    }
    const base = name.toLowerCase().replace(/\s+/g, "");
    const random = Math.floor(Math.random() * 10000);
    const username = `${base}${random}`;
    const newUser = await User.create({
      name,
      email,
      username,
      isVerified: true,
      socialLogin: true,
      provider: "google",
      profile: { avatar: picture },
      role,
    });

    generateTokenAndSetCookies(newUser._id, res);

    res.status(201).json({
      message: "Signup successful",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profile: newUser.profile,
        role: newUser.role,
      },
    });
  } catch (err) {
    console.error("Google signup controller error:", err);
    res.status(500).json({ message: "Signup failed" });
  }
};

export const logoutUser = (req, res) => {
  try {
    res.clearCookie("jwt-Company");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out user controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
