'use strict';
const {
  Model
} = require('sequelize');

const TagsSchema = require('./tagsSchema');
const PostTagsSchema = require('./posttagsSchema');

module.exports = (sequelize, DataTypes) => {
  class PostSchema extends Model {
    static associate(models) {

      PostSchema.belongsToMany(models.tags, {
        through: 'posttags'
      })

      PostSchema.belongsTo(models.category, {
         as: 'categories',
         foreignKey:'categoryId'
      })

      PostSchema.belongsTo(models.author, {
        as: 'authors',
        foreignKey:'authorId'
     })
    }
  }
  PostSchema.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      referrences: {
        model: 'category',
        key: 'id'
      }
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      referrences: {
        model: 'author',
        key: 'id'
      },
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'post',
    tableName: 'post'
  });

  return PostSchema;
};

// PostSchema.belongsToMany(TagsSchema,{
//   through:PostTagsSchema
// })

// TagsSchema.belongsToMany(PostSchema,{
//   through:PostTagsSchema
// })
