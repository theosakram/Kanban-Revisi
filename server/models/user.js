"use strict";
const { Model } = require("sequelize");
const { hash } = require("../helper/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Task, { foreignKey: "user_id" });
      User.hasMany(models.UserOrg, { foreignKey: "user_id" });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Email is already in use",
        },
        validate: {
          notEmpty: {
            args: true,
            msg: "Email is required",
          },
          notNull: true,
        },
      },
      password: DataTypes.STRING,
    },
    {
      sequelize,
      hooks: {
        beforeCreate: (user) => {
          user.password = hash(user.password);
        },
      },
      modelName: "User",
    }
  );
  return User;
};
