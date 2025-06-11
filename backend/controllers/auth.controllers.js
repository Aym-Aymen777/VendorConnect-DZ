import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookies } from "../utils/generateToken.js";
import { OAuth2Client } from "google-auth-library";
import { envVars } from "../utils/envVars.js";

const client = new OAuth2Client(envVars.googleClientId);

export const registerUser = async (req, res) => {
  const { username, name, email, password } = req.body;
  try {
    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // Hash the password and save the user
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return res
        .status(400)
        .json({ message: "Username can only contain alphanumeric characters" });
    }
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return res
        .status(400)
        .json({ message: "Name can only contain letters and spaces" });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    /*   if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)) {
            return res.status(400).json({ message: "Password must contain at least one uppercase letter, one lowercase letter, and one number" });
        } */
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      name,
      email,
      password: hashedPassword,
    });
    generateTokenAndSetCookies(user._id, res);
    await user.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    generateTokenAndSetCookies(user._id, res);
    return res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    console.error("Error logging in user controller:", error);
    return res.status(500).json({ message: "Internal server error" });
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
    res.clearCookie("jwt-Deadecor");
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Error logging out user controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
