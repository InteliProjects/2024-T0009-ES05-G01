const database = require("../database/models/index.js");


module.exports = class TurmaRepository {
  async getAll() {
    return await database.turmas.findAll();
  }

  async getAllByOficina(id_oficina) {
    return await database.turmas.findAll({
      where: {
        id_oficina: id_oficina
      }
    });
  }

  async getById(id) {
    return await database.turmas.findByPk(id, {
      include: [
        {
          model: database.usuarios,
          as: "usuarios",
          through: { attributes: [] },
          attributes: { exclude: ["senha"] },
          include: [
            {
              model: database.permissoes,
              as: "permissoes",
              attributes: ["perfil"],
            }
          ]
        },
        {model: database.aulas, as: "aulas"}
      ]
    });
  }

  async create(turma) {
    return await database.turmas.create(turma);
  }

  async update(id, turma) {
    const updatedTurma = await database.turmas.update(turma, {
      where: {
        id: id
      }
    });

    return updatedTurma;
  }

  async delete(id) {
    return await database.turmas.destroy({
      where: {
        id: id
      }
    });
  }
}

