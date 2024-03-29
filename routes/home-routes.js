//import modules
const router = require("express").Router();
const { BlogPost, Comment, User } = require("../models");
const withAuth = require("../utils/auth");

//route to render homepage
router.get("/", async (req, res) => {
  try {
    const blogData = await BlogPost.findAll({
      include: [{ model: User, attributes: ["name"] }],
    });
    //convert post to plain text
    const blogPosts = blogData.map((bp) => bp.get({ plain: true }));
    // Render homepage template with posts and login status
    res.render("homepage", { blogPosts, logged_in: req.session.logged_in });

    // If there is an error, return 500 status code and error message
  } catch (err) {
    res.status(500).json(err);
  }
});
// route to render single recipe page
router.get("/blogpost/:id", async (req, res) => {
  try {
    const postData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["name"] }],
    });
    if (!postData) {
      res.status(404).json({ message: "No recipe found with this id!" });
      return;
    }

    const post = postData.get({ plain: true });
    res.render("post", { ...post, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/upload", (req, res) => {
  // If the user is not logged in, redirect the request to another route
  if (!req.session.logged_in) {
    res.redirect("/login");
    return;
  }

  res.render("upload", { logged_in: req.session.logged_in });
});


router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      //save session data
      req.session.user_id = userData.id; //save logged in user id
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
