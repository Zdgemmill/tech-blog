const router = require('express').Router();
const BlogPostRoutes = require("./BlogPostRoutes");
const userRoutes = require("./UserRoutes");
const commentRoutes = require("./CommentRoutes");


router.use("/blogpost", BlogPostRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);



module.exports = router;
