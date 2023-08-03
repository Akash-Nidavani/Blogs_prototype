'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CategorySchema extends Model {
    static associate(models) {
      CategorySchema.hasMany(models.post, {
        as: 'categories',
        foreignKey:'categoryId'
      })
    }
  }
  CategorySchema.init({
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
    modelName: 'category',
    tableName:'category'
  });

  return CategorySchema;
};