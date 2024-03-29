const router = require("express").Router();
const { BlogPost, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');



// Get all posts for homepage
router.get("/", withAuth, (req, res) => {
    BlogPost.findAll({
        where: {
            userId: req.session.userId
        }
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("dashboard", {
                layout: "main",
                posts: posts
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("/login");
        });
});

// Render the create post page
router.get("/create", withAuth, (req, res) => {
    res.render("create", {
        layout: "main"
    });
});

// Render the edit post page
router.get("/edit/:id", withAuth, (req, res) => {
    BlogPost.findByPk(req.params.id)
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("edit", {
                    layout: "main",
                    post: post
                });
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;