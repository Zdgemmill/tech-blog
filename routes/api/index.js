const router = require('express').Router();
const BlogPostRoutes = require("./BlogPostRoutes");
const userRoutes = require("./UserRoutes");
const commentRoutes = require("./CommentRoutes");
const dashboardRoutes = require('./DashBoardRoutes');


router.use("/blogpost", BlogPostRoutes);
router.use("/users", userRoutes);
router.use("/comments", commentRoutes);
router.use('/dashboard', dashboardRoutes);



module.exports = router;
