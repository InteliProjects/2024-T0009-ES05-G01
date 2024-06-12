'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oficinas extends Model {
    static associate(models) {
      oficinas.belongsTo(models.ongs, {
        foreignKey: 'id_ong',
        as: 'ongs'
      });
      oficinas.hasMany(models.turmas, {
        foreignKey: 'id_oficina',
        as: 'turmas'
      });
    }
  }
  oficinas.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.STRING,
    tema: DataTypes.STRING,
    data_inicio: DataTypes.DATE,
    data_fim: DataTypes.DATE,
    id_ong: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'oficinas',
  });
  return oficinas;
};