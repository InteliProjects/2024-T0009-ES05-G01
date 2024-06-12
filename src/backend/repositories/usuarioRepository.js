const database = require('../database/models/index.js');


module.exports = class UsuarioRepository {
    async getAllByPerfil(perfil, campos) {
        return await database.usuarios.findAll({
            include: {
                model: database.permissoes,
                as: 'permissoes',
                through: { attributes: [] },
                attributes: ['perfil'],
                where: {
                    perfil: perfil
                }
            },
            attributes: campos
        });
    }
    async getByIdAndPerfil(id, campos) {
        return await database.usuarios.findOne({
            where: { id },
            attributes: campos,
            include: [
                {
                    model: database.permissoes,
                    as: 'permissoes',
                    through: { attributes: [] },
                    attributes: ['perfil'],
                }
            ]
        });
    }
    async getById(id) {
        return await database.usuarios.findOne({
            where: { id },
            include: [
                {
                    model: database.permissoes,
                    as: 'permissoes',
                    through: { attributes: [] },
                    attributes: ['perfil']
                }
            ]
        });
    }

    async getPermissao(perfil) {
        return await database.permissoes.findOne({
            where: { perfil }
        });
    }

    async create(usuario) {
        return await database.usuarios.create(usuario);
    }

    async createUsuarioPermissao(idUsuario, idPerfil) {
        await database.permissoes_usuarios.create({
            id_usuario: idUsuario,
            id_permissao: idPerfil
        });
    }

    async update(id, usuario) {
        return await database.usuarios.update(usuario, {
            where: { id }
        });
    }

    async delete(id) {
        const user = await database.usuarios.findByPk(id);

        if (!user) {
            return null;
        }

        await database.permissoes_usuarios.destroy({
            where: { id_usuario: id }
        });

        await database.usuarios.destroy({
            where: { id }
        });

        return user
    }
    async getOficinasByUsuario(id) {
        const usuario = await database.usuarios.findOne({
            where: { id },
            attributes: ['id'],
            include: [
                {
                    model: database.turmas,
                    as: 'turmas',
                    through: { attributes: [] },
                    include: [
                        {
                            model: database.oficinas,
                            as: 'oficinas',
                            attributes: ['id', 'nome', 'descricao']
                        }
                    ]
                }
            ]
        });
        return usuario.turmas.map(turma => turma.oficinas);
    }
};