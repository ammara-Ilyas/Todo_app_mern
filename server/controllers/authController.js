import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

const secret_key = "78965412hjyf";

export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    // Find the user by the verification token
    //  const user = await User.findOne({ verificationToken: token });
    const decoded = jwt.verify(token, secret_key);
    const userId = decoded.user.id;

    // Find the user and update their verification status
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    // Verify the user
    user.isVerified = true;
    // user.verificationToken = null;
    await user.save();

    res.json({ message: "Email verified successfully, you can now login" });
  } catch (error) {
    console.error("Registration error:", error.message);
    res.status(500).send("Server error");
  }
};
