const AutenticacaoRepository = require('../repositories/autenticacaoRepository.js');
const pkg = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const { verify } = pkg;

const autenticacaoRepository = new AutenticacaoRepository();

module.exports = class AutenticacaoService {
    async login(credenciais) {
        const usuario = await autenticacaoRepository.buscarPorEmail(credenciais.email);

        if (usuario && usuario.senha === credenciais.senha) {
            return {
                token: await autenticacaoRepository.gerarToken(usuario),
                usuario: {
                    id: usuario.id,
                    email: usuario.email,
                    nome: usuario.nome,
                    perfil: usuario.perfil
                },
                refreshToken: await autenticacaoRepository.gerarRefreshToken(usuario)
            }
        }

        throw new Error('Email ou senha inválidos');
    }

    async refreshToken(refreshToken) {
        try {
            const decoded = verify(refreshToken, process.env.SECRET_REFRESH);
            const usuario = await autenticacaoRepository.buscarPorEmail(decoded.usuario.email);

            if (usuario) {
                return {
                    token: await autenticacaoRepository.gerarToken(usuario),
                    usuario: {
                        id: usuario.id,
                        email: usuario.email,
                        nome: usuario.nome,
                        perfil: usuario.perfil
                    },
                    refreshToken: await autenticacaoRepository.gerarRefreshToken(usuario)
                }
            }
        } catch (error) {
            throw new Error('Refresh Token inválido');
        }
    }
}
