const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// get request to pull comment data
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single recipe
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
    if (!commentData) {
      res.status(404).json({ message: "No comment found with this id!" });
      return;
    }
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newComment);
    console.log("newComment", newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;
