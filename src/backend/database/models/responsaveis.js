'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class responsaveis extends Model {
    static associate(models) {
      responsaveis.belongsToMany(models.usuarios, {
        through: 'responsaveis_usuarios',
        foreignKey: 'id_responsavel',
        as: 'usuarios'
      });
    }
  }
  responsaveis.init({
    nome: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'responsaveis',
  });
  return responsaveis;
};