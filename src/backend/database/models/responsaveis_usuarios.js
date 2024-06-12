'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class responsaveis_usuarios extends Model {
    static associate(models) {
      // define association here
    }
  }
  responsaveis_usuarios.init({
    id_usuario: DataTypes.INTEGER,
    id_responsavel: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'responsaveis_usuarios',
  });
  return responsaveis_usuarios;
};