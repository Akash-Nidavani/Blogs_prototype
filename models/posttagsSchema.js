'use strict';
const { Model, DataTypes, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PostTagsSchema extends Model {
    static associate(models) {
    }
  }
  PostTagsSchema.init({
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "cascade",
      references: {
        model: "post",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
    tagsId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      onDelete: "cascade",
      references: {
        model: "tags",
        key: "id",
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
    },
  }, {
    sequelize,
    modelName: 'posttags',
  });
  return PostTagsSchema;
};