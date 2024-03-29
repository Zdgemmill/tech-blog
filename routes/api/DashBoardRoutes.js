const router = require("express").Router();
const { BlogPost, Comment, User } = require('../../models');
const withAuth = require('../../utils/auth');

// get all posts for homepage
router.get("/post", withAuth, (req, res) => {
    BlogPost.findAll({
        where: {
            userId: req.session.userId
        }
    })
        .then((dbPostData) => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));

            res.render("allAdmin", {
                layout: "dashboard",
                posts
            });
        })
        .catch(err => {
            console.log(err);
            res.redirect("login");
        });
});
router.get("/create", withAuth, (req, res) => {
    res.render("create", {
        layout: "dashboard"
    });
});

router.get("/edit/:id", withAuth, (req, res) => {
    Post.findByPk(req.params.id)
        .then(dbPostData => {
            if (dbPostData) {
                const post = dbPostData.get({ plain: true });

                res.render("edit", {
                    layout: "dashboard",
                    post
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