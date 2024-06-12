const AulaRepository = require("../repositories/aulaRepository.js");

const aulaRepository = new AulaRepository();

module.exports = class AulaService {
  async getAllByTurma(idTurma) {
    return await aulaRepository.getAllByTurma(idTurma);
  }

  async getById(id) {
    const aula = await aulaRepository.getById(id);

    if (!aula) {
      throw new Error("Aula não encontrada!");
    }

    return aula;
  }

  async create(aula) {
    const newAula = await aulaRepository.create(aula);

    if (!newAula) {
      throw new Error("Erro ao criar aula!");
    }

    return newAula;
  }

  async update(id, aula) {
    const updatedAula = await aulaRepository.update(id, aula);

    if (!updatedAula) {
      throw new Error("Aula não encontrada!");
    }

    return updatedAula;
  }

  async insertPresencas(idAula, presencas) {
    const updatedAula = await aulaRepository.insertPresencas(idAula, presencas);

    if (!updatedAula) {
      throw new Error("Erro ao inserir presenças!");
    }

    return updatedAula;
  }

  async getPresencas(idAula) {
    const presencas = await aulaRepository.getPresencas(idAula);

    return presencas;
  }
};
