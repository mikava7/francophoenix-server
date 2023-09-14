import User from "../../modules/User/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const foundUser = await User.findOne({ email }).exec();

    if (!foundUser) {
      return res.status(401).json({
        message: "Unauthorized. Check if this message appears in Thunder.",
      });
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Change the user's role to "subscriber"
    // This assumes that you have a field named "role" in your user schema
    foundUser.role = "subscriber";
    await foundUser.save(); // Save the updated user document

    const currentUser = await User.findOne({ email })
      .select("-password -email ")
      .exec();

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles: foundUser.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "30d" }
    );

    // Create a secure cookie with the refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // Accessible only by the web server
      secure: true, // HTTPS
      sameSite: "None", // Cross-site cookie
      maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiry: set to match refresh token
    });
    // console.log("cookie", res.cookie);
    // Send the accessToken containing username and roles
    res.json({ accessToken, user: currentUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const { id } = req.body;

    // Update the user's role to "consumer" in the database
    await User.findByIdAndUpdate(id, { role: "consumer" });

    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: true, // Enable for HTTPS
      sameSite: "None", // Enable for cross-site cookies
    });

    // Respond with a success message
    res.json({ message: 'Logout successful. Role changed to "consumer".' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
