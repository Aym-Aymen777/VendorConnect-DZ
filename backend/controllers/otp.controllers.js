import redis from "../config/redisClient.js";
import { sendWhatsAppOtp } from "../config/metaApi.js";
import {User} from "../models/user.model.js";

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

export const sendOtp = async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber)
    return res.status(400).json({ message: "Phone number is required" });

  const otp = generateOTP();
  const key = `otp:${phoneNumber}`;

  try {
    await redis.set(key, otp, "EX", 300); // Expires in 5 min
    await sendWhatsAppOtp({ phoneNumber, otp });
    res.json({ message: "OTP sent via WhatsApp" });
  } catch (err) {
    console.error(err.response?.data || err.message);
    console.log(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { phoneNumber, otp, userID } = req.body;
    if (!phoneNumber || !otp || !userID)
      return res.status(400).json({ message: "Missing parameters" });

    const key = `otp:${phoneNumber}`;
    const storedOtp = await redis.get(key);

    if (!storedOtp) {
      return res.status(400).json({ message: "OTP expired or not found" });
    }

    if (storedOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    await redis.del(key);
    const user = await User.findOne({ _id: userID });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.phoneNumber = phoneNumber;
    user.phoneVerified = true;
    await user.save();
    res.json({ message: "Phone number verified successfully" });
  } catch (error) {
    console.error("Error verifying phone number:", error.message);
    res.status(500).json({ message: "Failed to verify phone number" });
  }
};
