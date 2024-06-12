'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class permissoes extends Model {
    static associate(models) {
      permissoes.belongsToMany(models.usuarios, {
        through: 'permissoes_usuarios',
        foreignKey: 'id_permissao',
        as: 'usuarios'
      });
    }
  }
  permissoes.init({
    perfil: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'permissoes',
  });
  return permissoes;
};