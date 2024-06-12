const OngRepository = require('../repositories/ongRepository.js');

const ongRepository = new OngRepository();

module.exports = class OngService {
  async getAll() {
    return await ongRepository.getAll();
  }

  async getById(id) {
    const ong = await ongRepository.getById(id);
    if (!ong) {
      throw new Error('ONG não encontrada.');
    }

    return ong;
  }

  async getBeneficiados(id) {
    return ongRepository.getBeneficiados(id);
  }

  async create(ong) {
    const newOng = await ongRepository.create(ong);

    if (!newOng) {
      throw new Error('Erro ao criar ONG. Verifique se o CNPJ já está cadastrado.');
    }

    return newOng;
  }

  async update(id, ong) {
    const updatedOng = await ongRepository.update(id, ong);

    if (!updatedOng) {
      throw new Error('ONG não encontrada!');
    }

    return updatedOng;
  }

  async delete(id) {
    return await ongRepository.delete(id);
  }

  async getProfessores(id) {
    return await ongRepository.getProfessores(id);
  }
}
