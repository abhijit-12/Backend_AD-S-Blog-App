const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifytoken");
const blogModel = require("../model/blogmodel");
const isAdmin = require("../middleware/isAdmin");

//post blog
router.post("/addposts", verifyToken, isAdmin, async (req, res) => {
  try {
    const newBlog = new blogModel(req.body);
    await newBlog.save();
    res.status(200).json({ massage: "blog added successfully" });
  } catch (error) {
    console.log(error);
    res.status(401).json({ massage: "Error to add data " });
  }
});

//get blogs
router.get("/", async (req, res) => {
  try {
    const blog = await blogModel.find();
    res.status(200).send({ blog });
  } catch (error) {
    console.log(error);
    res.status(401).json({ massage: "Error to get data " });
  }
});

//get blog by id
router.get("/:id", async (req, res) => {
  try {
    const blogId = req.params.id;
    const blog = await blogModel.findById(blogId);
    res.status(200).json({ blog });
  } catch (error) {
    console.log(error);
    res.status(401).json({ massage: "Error to find singel data " });
  }
});

//update blog by id
router.patch("/updateblog/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const blogId = req.params.id;
    const updateBlog = await blogModel.findByIdAndUpdate(
      blogId,
      { ...req.body },
      { new: true }
    );
    res.status(200).json({ massage: "Blog updated successfully", updateBlog });
  } catch (error) {
    console.log(error);
    res.status(401).json({ massage: "Error to update data " });
  }
});

//delete blog by id
router.delete("/delblog/:id", verifyToken, isAdmin, async (req, res) => {
  try {
    const blogId = req.params.id;
    const deleteBlog = await blogModel.findByIdAndDelete(blogId);
    res.status(200).json({ massage: "Blog deleted successfully", deleteBlog });
  } catch (error) {
    console.log(error);
    res.status(401).json({ massage: "Error to delete data " });
  }
});

module.exports = router;
