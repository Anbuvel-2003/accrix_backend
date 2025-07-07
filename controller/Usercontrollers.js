import User from "../models/usermodel.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const {
    name,
    mobilenumber,
    Is_super_Admin,
    email,
    password,
    fcmtoken,
    Is_login,
  } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newUser = await User.create({
      name,
      mobilenumber,
      Is_super_Admin,
      Is_login,
      email,
      password,
      fcmtoken,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
};
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // 🔒 Token valid for 30 days
  });
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Update Is_login to true
    user.Is_login = true;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      message: "Login successful",
      accesstoken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        Is_login: user.Is_login,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};
// logout User
const logoutUser = async (req, res) => {
  try {
    const userId = req.params?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Update Is_login to false and clear fcmtoken
    await User.findByIdAndUpdate(userId, {
      Is_login: false,
      fcmtoken: null,
    });
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return res.status(200).json({
      message: "Logged out successfully, login status and FCM token cleared",
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Logout failed", error: err.message });
  }
};

export { registerUser, loginUser, logoutUser };
