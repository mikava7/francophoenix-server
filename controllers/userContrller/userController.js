import User from "../../modules/User/userSchema.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
  try {
    // Extract user registration data from the request body
    const { username, email, password } = req.body;
    let generatedUsername = username; // Initialize with the provided username

    if (!username || username.length === 0) {
      // If username is not provided, generate one based on the number of existing users
      const userCount = await User.countDocuments();
      generatedUsername = `user${userCount + 1}`;
    }
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the username or email already exists in the database
    const existingUsernameUser = await User.findOne({
      $or: [{ username: generatedUsername }],
    });
    const existingEmail = await User.findOne({ $or: [{ email }] });

    if (existingUsernameUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (existingEmail) {
      return res.status(401).json({ message: "Email already exists" });
    }

    // Hash the user's password before saving it
    const saltRounds = 10; // Number of salt rounds for bcrypt
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user document with the hashed password
    const newUser = new User({
      username: generatedUsername,
      email,
      password: hashedPassword, // Store the hashed password in the database
    });
    //     console.log("newUser", newUser);
    // Save the user document to the MongoDB database
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, username } = req.body;
    const user = await User.findById(id).exec();
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const existingUsername = await User.findOne({
      $or: [{ username }],
    });

    if (existingUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }
    user.username = username;
    console.log("username", username);
    const updatedUser = await user.save();
    res.json({
      message: `Username changed succesfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
