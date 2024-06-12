const database = require("../database/models/index.js");

module.exports = class AulaRepository {
  async getAllByTurma(idTurma) {
    return await database.aulas.findAll({ where: { id_turma: idTurma } });
  }

  async getById(id) {
    return await database.aulas.findByPk(id);
  }

  async create(aula) {
    // valida se a turma está ativa
    const turma = await database.turmas.findByPk(aula.id_turma);

    if (!turma || !turma.ativo) {
      return null;
    }

    // valida se o professor existe
    const professor = await database.usuarios.findByPk(aula.id_professor, {
      include: {
        model: database.permissoes,
        as: "permissoes",
        where: { perfil: "PROF" },
      },
    });

    if (!professor) {
      return null;
    }

    return await database.aulas.create(aula);
  }

  async update(id, aula) {
    const updatedAula = await database.aulas.update(aula, { where: { id } });

    if (!updatedAula) {
      return null;
    }

    return await database.aulas.findByPk(id);
  }

  async insertPresencas(idAula, presencas) {
    const aula = await database.aulas.findByPk(idAula);

    if (!aula) {
      return null;
    }

    const alunos = await database.usuarios.findAll({
      include: {
        model: database.turmas,
        as: "turmas",
        where: { id: aula.id_turma },
      }
    });

    if (!alunos) {
      return null;
    }

    const presencasValidas = presencas.filter((id_aluno) =>
      alunos.some((aluno) => aluno.id === id_aluno)
    );

    // se tem presencas validas, destroi as antigas
    await database.presencas.destroy({ where: { id_aula: idAula } });

    const dadosInserir = presencasValidas.map((id_aluno) => ({
      id_aula: idAula,
      id_usuario: id_aluno,
    }));

    return await database.presencas.bulkCreate(dadosInserir);
  }

  async getPresencas(idAula) {
    return await database.presencas.findAll({ where: { id_aula: idAula } });
  }
};
