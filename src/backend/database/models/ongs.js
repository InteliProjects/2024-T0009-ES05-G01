'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ongs extends Model {
    static associate(models) {
      // define association here
    }
  }
  ongs.init({
    nome: DataTypes.STRING,
    imagem: DataTypes.STRING,
    descricao: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    endereco_cidade: DataTypes.STRING,
    endereco_estado: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ongs',
  });
  return ongs;
};