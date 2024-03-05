const router = require("express").Router();
const { BlogPost, User } = require("../../models");
const withAuth = require("../../utils/auth");

//get request to pull recipe data
router.get("/", async (req, res) => {
    try {
        const recipeData = await BlogPost.findAll();
        res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// GET a single recipe
router.get("/:id", async (req, res) => {
    try {
        const BlogPostData = await BlogPost.findByPk(req.params.id, {
            // JOIN with locations, using the Trip through table
            include: [{ model: User, attributes: ["name", "amount"] }],
        });
        const bp = BlogPostData.get({ plain: true });
        console.log(bp);
        res.status(200).json(bp);

        if (!recipeData) {
            res.status(404).json({ message: "No recipe found with this id!" });
            return;
        }
        // res.status(200).json(recipeData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/", withAuth, async (req, res) => {
    try {
        const newPost = await BlogPost.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.delete("/:id", withAuth, async (req, res) => {
    try {
        const BlogPostData = await BlogPost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!recipeData) {
            res.status(404).json({ message: "No post found with this id!" });
            return;
        }

        res.status(200).json(BlogPostData);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;
