
const { Comment } = require("../models");

const commentData = [
  {
    comment_text: "Great recipe!",
    user_id: 1,
    recipe_id: 1,
    date_created: "2021-04-01",
  },

];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments
