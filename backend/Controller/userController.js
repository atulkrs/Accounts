const User = require("../Models/userModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!name || !email || !password || !role) {
    return res
      .status(400)
      .json({ error: "All fields are required: name, email, password, role" });
  }
  const validRoles = ["admin", "customer", "vendor"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role Selected" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await user.save();

    res.status(201).json({
      msg: "Member registered successfully",
      member: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { userId: user._id, name: user.name, email: user.email },
      JWT_SECRET,
      {
        expiresIn: "7h",
      }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// const getUserData = async (req, res) => {
//   try {
//     const userId = req.user;

//     const user = await User.findById(userId);
//     console.log(user);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json(user);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };
// const updateUserData = async (req, res) => {
//   const userId = req.user;
//   const { name, bio, email, imagebase64 } = req.body;

//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(400).json({ message: "user not found" });
//     }
//     if (name) {
//       user.name = name;
//     }
//     if (bio) {
//       user.bio = bio;
//     }
//     if (email) {
//       user.email = email;
//     }
//     if (imagebase64) {
//       user.profile_picture = imagebase64;
//     }
//     await user.save();

//     res.status(200).json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Failed to update user data" });
//   }
// };

module.exports = {
  register,
  login,
  //   getUserData,
};
