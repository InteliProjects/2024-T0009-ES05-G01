const database = require('../database/models/index.js');


module.exports = class OficinaRepository {
    async getAllByOng(idOng) {
        return database.oficinas.findAll({
            where: {
                id_ong: idOng,
            },
        });
    }

    async getById(id) {
        return database.oficinas.findByPk(id);
    }

    async create(oficina) {
        return await database.oficinas.create(oficina);
    }
    
    async update(id, oficina) {
        return await database.oficinas.update(oficina, {
            where: {
                id: id,
            },
        });
    }

    async delete(id) {
        return await database.oficinas.destroy({
            where: {
                id: id,
            },
        });
    }
}