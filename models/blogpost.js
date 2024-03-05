const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// Define the Recipe model by extending the Sequelize Model class
class BlogPost extends Model { }

// Initialize the Recipe model with its attributes and data types
BlogPost.init(
    {
        // Define the ID attribute with its data type and constraints
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        // Define the name attribute with its data type and constraints
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Define the contents attribute with its data type and constraints
        contents: {
            type: DataTypes.TEXT,
            allowNull: false,
        },

        // Define the date_created attribute with its data type and constraints
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        // Define the user_id attribute with its data type and constraints, including a foreign key reference
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: "user",
                key: "id",
            },
        },
    },
    // Define additional configuration options for the Recipe model
    {
        sequelize, // Specify the Sequelize connection
        timestamps: false, // Disable default timestamps (createdAt and updatedAt)
        freezeTableName: true, // Prevent Sequelize from pluralizing the table name
        underscored: true, // Use underscores instead of camelCase for automatically generated attribute names
        modelName: "post", // Specify the model name
    }
);

// Export the Recipe model for use in other parts of the application
module.exports = BlogPost;
