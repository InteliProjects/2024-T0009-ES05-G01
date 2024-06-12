'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usuarios extends Model {
    static associate(models) {
      usuarios.belongsToMany(models.responsaveis, {
        through: 'responsaveis_usuarios',
        foreignKey: 'id_usuario',
        as: 'responsaveis'
      });
      usuarios.belongsToMany(models.permissoes, {
        through: 'permissoes_usuarios',
        foreignKey: 'id_usuario',
        as: 'permissoes'
      });
      usuarios.belongsTo(models.ongs, {
        foreignKey: 'id_ong',
        as: 'ong'
      });
      usuarios.belongsToMany(models.turmas, {
        through: 'usuarios_turmas',
        foreignKey: 'id_usuario',
        as: 'turmas'
      });
      usuarios.belongsToMany(models.aulas, {
        through: 'presencas',
        foreignKey: 'id_usuario',
        as: 'aulas'
      });
    }
  }
  usuarios.init({
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    rg: DataTypes.STRING,
    telefone: DataTypes.STRING,
    cpf: DataTypes.STRING,
    data_nasc: DataTypes.DATE,
    profissao: DataTypes.STRING,
    nacionalidade: DataTypes.STRING,
    escolaridade: DataTypes.STRING,
    identidade: DataTypes.STRING,
    naturalidade: DataTypes.STRING,
    etnia: DataTypes.STRING,
    estado_civil: DataTypes.STRING,
    data_inicio: DataTypes.DATE,
    area_atuacao: DataTypes.STRING,
    renda: DataTypes.DECIMAL,
    situacao: DataTypes.STRING,
    qualificacoes: DataTypes.TEXT,
    turno_inicio: DataTypes.STRING,
    turno_fim: DataTypes.STRING,
    especialidade: DataTypes.STRING,
    cargo: DataTypes.STRING,
    voluntariado: DataTypes.BOOLEAN,
    id_ong: DataTypes.INTEGER,
    genero: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'usuarios',
  });
  return usuarios;
};