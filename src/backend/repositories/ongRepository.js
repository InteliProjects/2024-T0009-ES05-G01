const database = require("../database/models/index.js");

module.exports = class OngRepository {
  async getAll() {
    return await database.ongs.findAll();
  }

  async getById(id) {
    return await database.ongs.findByPk(id);
  }

  async getBeneficiados(id) {
    const beneficiados = await database.usuarios.findAll({
      where: {
        id_ong: id,
      },
      include: [
        {
          model: database.responsaveis,
          as: 'responsaveis',
          attributes: ['nome', 'telefone', 'email'],
        },
        {
          model: database.turmas,
          as: 'turmas',
          attributes: ['nome', 'local'],
          include: [
            {
              model: database.oficinas,
              as: 'oficinas',
              attributes: ['nome', 'descricao'],
            },
          ],
        },
        {
          model: database.permissoes,
          as: 'permissoes',
          attributes: ['perfil'],
          where: { perfil: 'BENEFICIADO' },
        },
      ],
    });

    // move as oficinas para o nível de beneficiado, facilitando a exibição
    beneficiados.forEach((beneficiado) => {
      let oficinas = [];
      beneficiado.turmas.forEach((turma) => {
        if (!turma.oficinas) {
          return;
        }
        oficinas = oficinas.concat(turma.oficinas);
      });
      beneficiado.setDataValue('oficinas', oficinas);
    });

    return beneficiados;
  }

  async create(ong) {
    // valida se já existe uma ONG com o mesmo cnpj
    const ongExists = await database.ongs.findOne({
      where: { cnpj: ong.cnpj },
    });

    if (ongExists) {
      return null;
    }

    return await database.ongs.create(ong);
  }

  async update(id, ong) {
    const updatedOng = await database.ongs.update(ong, { where: { id } });

    if (!updatedOng) {
      return null;
    }

    return await database.ongs.findByPk(id);
  }

  async delete(id) {
    const ong = await database.ongs.findByPk(id);

    if (!ong) {
      return null;
    }

    await database.ongs.destroy({ where: { id } });

    return ong;
  }

  async getProfessores(id) {
    const usuarios = await database.usuarios.findAll({
      where: { id_ong: id },
      include: [
        {
          model: database.permissoes,
          through: { attributes: [] },
          where: { perfil: "PROF" },
          as: 'permissoes'
        },
      ],
    });

    return usuarios;
  }
};
