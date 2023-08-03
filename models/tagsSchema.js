'use strict';
const {
  Model
} = require('sequelize');

const PostSchema = require("./postSchema")
const PostTagsSchema = require("./posttagsSchema")

module.exports = (sequelize, DataTypes) => {
  class TagsSchema extends Model {
    static associate(models) {
      TagsSchema.belongsToMany(models.post, {
        through:'posttags'
      })
    }
  }
  TagsSchema.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
  }, {
    sequelize,
    modelName: 'tags',
    tableName:'tags'
  });

  return TagsSchema;
};