"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class presencas extends Model {
    static associate(models) {
      presencas.belongsTo(models.usuarios, {
        foreignKey: "id_usuario",
        as: "usuario",
      });
      presencas.belongsTo(models.aulas, {
        foreignKey: "id_aula",
        as: "aula",
      });
    }
  }
  presencas.init(
    {
      id_usuario: DataTypes.INTEGER,
      id_aula: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "presencas",
    }
  );
  return presencas;
};
