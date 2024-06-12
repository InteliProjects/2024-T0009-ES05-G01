'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios_turmas extends Model {
    static associate(models) {
      usuarios_turmas.belongsTo(models.usuarios, {
        foreignKey: "id_usuario",
        as: "usuario"
      });
      usuarios_turmas.belongsTo(models.turmas, {
        foreignKey: "id_turma",
        as: "turma"
      });
    }
  }
  usuarios_turmas.init({
    id_usuario: DataTypes.INTEGER,
    id_turma: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usuarios_turmas',
  });
  return usuarios_turmas;
};