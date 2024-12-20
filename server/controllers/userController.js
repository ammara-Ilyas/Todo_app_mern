import { User } from "../models/auth.js";

export const handleRegistration = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("Registration request body:", req.body);

  try {
    // 1. Check if the user already exists
    const registeredUser = await User.findOne({ email });
    if (registeredUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const user = new User({
      name,
      email,
      password,
    });

    // 3. Save the new user to the database
    await user.save();

    // 4. Respond with success message
    res.status(201).json({
      msg: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).send("Server error");
  }
};

export const handleLogin = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from the request body
  console.log("Login request body:", req.body);

  try {
    // 1. Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Email does not exist" });
    }

    // 2. Compare plain-text passwords
    if (user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // 3. Successful login response
    res.status(200).json({
      msg: "Login successful!",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).send("Server error");
  }
};
