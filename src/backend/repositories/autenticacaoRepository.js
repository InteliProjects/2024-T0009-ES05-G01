// const usuarios = require('../database/mock/usuarios.json');
const database = require('../database/models');
const pkg = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { sign } = pkg;


module.exports = class AutenticacaoRepository {
    constructor() {
        this.secret = process.env.SECRET;
        this.secret_refresh = process.env.SECRET_REFRESH;
        this.accessTokenExpiration = process.env.ACCESS_TOKEN_EXPIRATION;
        this.refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION;
    }

    async buscarPorEmail(email) {
        const usuario = database.usuarios.findOne({
            where: { email },
        })

        return usuario
    }

    async gerarToken(usuario) {
        const usuarioCompleto = await database.usuarios.findByPk(usuario.id, {
            include: [
                {
                    model: database.permissoes,
                    as: 'permissoes',
                    through: { attributes: [] },
                    attributes: ['perfil']
                },
                {
                    model: database.ongs,
                    as: 'ong',
                    attributes: ['id', 'nome'],
                }
            ]
        });

        if (!usuarioCompleto) {
            throw new Error('Usuário não encontrado!!!');
        }

        const accessToken = sign({ usuario: { id: usuarioCompleto.id, email: usuarioCompleto.email, nome: usuarioCompleto.nome, perfil: usuarioCompleto.permissoes.map((p) => p.perfil.toLowerCase()), ong: usuarioCompleto.ong } }, this.secret, { expiresIn: this.accessTokenExpiration });
        return accessToken;
    }

    async gerarRefreshToken(usuario) {
        const usuarioCompleto = await database.usuarios.findByPk(usuario.id)

        const refreshToken = sign({ usuario: { id: usuarioCompleto.id, email: usuarioCompleto.email } }, this.secret_refresh, { expiresIn: this.refreshTokenExpiration });
        return refreshToken;
    }

}
