'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class turmas extends Model {
    static associate(models) {
      turmas.hasMany(models.aulas, {
        foreignKey: 'id_turma',
        as: 'aulas'
      });
      turmas.belongsTo(models.oficinas, {
        foreignKey: 'id_oficina',
        as: 'oficinas'
      });
      turmas.belongsToMany(models.usuarios, {
        through: 'usuarios_turmas',
        foreignKey: 'id_turma',
        as: 'usuarios'
      });
    }
  }
  turmas.init({
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    vagas: DataTypes.INTEGER,
    local: DataTypes.STRING,
    repetir: DataTypes.STRING,
    id_oficina: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'turmas',
  });
  return turmas;
};