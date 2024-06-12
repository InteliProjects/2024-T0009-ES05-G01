const database = require("../database/models/index.js");

module.exports = class ResponsavelRepository {
  async getAll() {
    return await database.responsaveis.findAll();
  }

  async getById(id) {
    return await database.responsaveis.findByPk(id);
  }

  async create(responsavel) {
    return await database.responsaveis.create(responsavel);
  }

  async update(id, responsavel) {
    const updatedResponsavel = await database.responsaveis.update(responsavel, {
      where: { id },
    });

    if (!updatedResponsavel) {
      return null;
    }

    return await database.responsaveis.findByPk(id);
  }

  async delete(id) {
    const deletedResponsavel = await database.responsaveis.destroy({
      where: { id },
    });

    if (!deletedResponsavel) {
      return null;
    }

    return true;
  }
}