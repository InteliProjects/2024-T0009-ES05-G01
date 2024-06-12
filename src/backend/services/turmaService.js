const TurmaRepository = require("../repositories/turmaRepository.js");

const turmaRepository = new TurmaRepository();

module.exports = class TurmaService {
  async getAll() {
    return await turmaRepository.getAll();
  }

  async getAllByOficina(id_oficina) {
    return await turmaRepository.getAllByOficina(id_oficina);
  }

  async getById(id) {
    const turma = await turmaRepository.getById(id);

    if (!turma) {
      throw new Error("Turma não encontrada!");
    }

    return turma;
  }

  async create(turma) {
    const newTurma = await turmaRepository.create(turma);

    if (!newTurma) {
      throw new Error("Erro ao criar turma!");
    }

    return newTurma;
  }

  async update(id, turma) {
    const updatedTurma = await turmaRepository.update(id, turma);

    if (!updatedTurma) {
      throw new Error("Turma não encontrada!");
    }

    return updatedTurma;
  }

  async delete(id) {
    const turmaDeleted = await turmaRepository.delete(id);

    if (!turmaDeleted) {
      throw new Error("Turma não encontrada!");
    }

    return;
  }
}
