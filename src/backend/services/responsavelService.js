const ResponsavelRepository = require('../repositories/responsavelRepository.js');

const responsavelRepository = new ResponsavelRepository();

module.exports = class ResponsavelService {
  async getAll() {
    return await responsavelRepository.getAll();
  }

  async getById(id) {
    const responsavel = await responsavelRepository.getById(id);

    if (!responsavel) {
      throw new Error('Responsável não encontrado!');
    }

    return responsavel;
  }

  async create(responsavel) {
    const newResponsavel = await responsavelRepository.create(responsavel);

    if (!newResponsavel) {
      throw new Error('Erro ao criar responsável!');
    }

    return newResponsavel;
  }

  async update(id, responsavel) {
    const updatedResponsavel = await responsavelRepository.update(id, responsavel);

    if (!updatedResponsavel) {
      throw new Error('Responsável não encontrado!');
    }

    return updatedResponsavel;
  }

  async delete(id) {
    const deletedResponsavel = await responsavelRepository.delete(id);

    if (!deletedResponsavel) {
      throw new Error('Responsável não encontrado!');
    }

    return;
  }
}