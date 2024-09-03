const express = require("express");
const router = express.Router();
const userModel = require("../model/usermodel");
const generateToken = require("../middleware/generatetoken");

//register user
router.post("/reg", async (req, res) => {
  try {
    const user = await userModel(req.body);
    await user.save();
    res.status(200).json({ massage: "Registration Successful" });
    console.log(user);
  } catch (error) {
    console.log(error);
    res.status(401).json({ massage: "Registration Failed " });
  }
});

//login user
router.post("/login", async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ massage: "user not found" });
    }

    const validPassword = await user.comparePassword(password);
    if (!validPassword) {
      return res.status(401).json({ massage: "Invalid Password" });
    }

    //generate token
    const token = await generateToken(user._id);
    // console.log(token);
    res.cookie("token", token, {
      httpOnly: true, // only accessible via HTTP requests
      secure: true, // only accessible via HTTPS requests
      sameSite: true,
    });

    res.status(200).json({
      massage: "Login Successful",
      token,
      user: {
        _id: user._id,
        username: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({ massage: "Registration Failed " });
  }
});

//logout user
router.post("/logout", (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ massage: "Logged out Successfully" });
  } catch (error) {
    console.log("Logout Failed");
  }
});

//get user data
router.get("/users", async (req, res) => {
  const users = await userModel.find({}, "id username email role");
  res.status(200).json({ massage: "users found successfully", users });
});

//delete a user
router.delete("/deluser/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const deleteUser = await userModel.findByIdAndDelete(userId);
    res.status(200).json({ massage: "User deleted successfully", deleteUser });
  } catch (error) {
    console.log(error);
    res.status(501).json({ massage: "faield to delete", error });
  }
});

//update a user role
router.put("/userupd/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return res.status(501).json({ massage: "User not found" });
    }
    res.status(200).json({ massage: "User updated successfully", user });
  } catch (error) {
    console.log(error);
    res.status(501).json({ massage: "faield to update", error });
  }
});
module.exports = router;
