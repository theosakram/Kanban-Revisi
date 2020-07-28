"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserOrg extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserOrg.belongsTo(models.User, { foreignKey: "user_id" });
      UserOrg.belongsTo(models.Organization, { foreignKey: "organization_id" });
    }
  }
  UserOrg.init(
    {
      user_id: DataTypes.INTEGER,
      organization_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserOrg",
    }
  );
  return UserOrg;
};
