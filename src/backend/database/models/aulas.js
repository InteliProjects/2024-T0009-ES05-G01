'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class aulas extends Model {
    static associate(models) {
      aulas.belongsTo(models.turmas, { foreignKey: 'id_turma' });
      aulas.belongsTo(models.usuarios, { foreignKey: 'id_professor', as: 'professor'});
      aulas.belongsToMany(models.usuarios, {
        through: 'presencas',
        foreignKey: 'id_aula',
        as: 'alunosPresentes'
      });
    }
  }
  aulas.init({
    id_turma: DataTypes.INTEGER,
    id_professor: DataTypes.INTEGER,
    dia: DataTypes.DATEONLY,
    horario: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'aulas',
  });
  return aulas;
};