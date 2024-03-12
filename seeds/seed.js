const sequelize = require("../config/connection");
const { User, Comment, BlogPost } = require("../models");

const userData = require("./userData.json");
const postData = require("./postData");
const commentData = require("./commentData");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const post of postData) {
    const dbPost = await BlogPost.create({
      ...post,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  for (const comment of commentData) {
    const comments = await Comment.create({
      ...comment,
      user_id: comment.user_id,
      post_id: comment.post_id,
    });
  }

  process.exit(0);
};

seedDatabase();
