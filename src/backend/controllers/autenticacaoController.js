const Joi = require('joi');
const AutenticacaoService = require('../services/autenticacaoService.js');
const Express = require('express');

const autenticacaoService = new AutenticacaoService();

class AutenticacaoController {
    /**
     * Método responsável por realizar o login do usuário. Valida as credenciais fornecidas,
     * define um cookie com o refreshToken, e retorna um token de autorização no cabeçalho da resposta.
     * Em caso de erro na validação das credenciais, retorna um erro 400 com detalhes do erro.
     * 
     * @date 3/2/2024 - 12:20:25 PM
     *
     * @static
     * @param {Express.Request} req - O objeto de solicitação do Express, contendo as credenciais do usuário no corpo.
     * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a resposta ao cliente.
     * @returns {Promise<void>} - Uma promessa que resolve quando a resposta é enviada ao cliente. Não retorna nenhum valor diretamente.
     * 
     * @example
     * // Exemplo de uso:
     * router.post('/login', AutenticacaoController.login);
     */
    static async login(req, res) {
        const schema = Joi.object({
            email: Joi.string().email().required(),
            senha: Joi.string().required()
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).json({ erro: error.details[0].message });
        }

        try {
            const retorno = await autenticacaoService.login(req.body);

            req.usuario = retorno.usuario;

            res.header('Authorization', retorno.token).status(200).json(retorno);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    /**
     * Método responsável por realizar o refresh do token de autorização. Recebe o refreshToken do cookie
     * da solicitação, e retorna um novo token de autorização no cabeçalho da resposta.
     * Em caso de erro na validação do refreshToken, retorna um erro 401 com detalhes do erro.
     * 
     * @date 3/2/2024 - 12:20:25 PM
     * 
     * @static
     * @param {Express.Request} req - O objeto de solicitação do Express, contendo o refreshToken no cookie.
     * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a resposta ao cliente.
     * @returns {Promise<void>} - Uma promessa que resolve quando a resposta é enviada ao cliente.
     * 
     * @example
     * // Exemplo de uso:
     * router.post('/refreshToken', AutenticacaoController.refreshToken);
     */
    static async refreshToken(req, res) {
        const refreshToken = req.headers['x-refresh-token'];

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh Token não encontrado' });
        }

        try {
            const retorno = await autenticacaoService.refreshToken(refreshToken);

            req.usuario = retorno.usuario;

            res.header('Authorization', retorno).status(200).json(retorno);
        } catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }

    /**
     * Método responsável por realizar o logout do usuário. Define o usuário como nulo, e limpa o cookie
     * do refreshToken da resposta.
     * 
     * @date 3/2/2024 - 12:20:25 PM
     * 
     * @static
     * @param {Express.Request} req - O objeto de solicitação do Express, contendo o usuário a ser deslogado.
     * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a resposta ao cliente.
     * @returns {Promise<void>} - Uma promessa que resolve quando a resposta é enviada ao cliente.
     * 
     * @example
     * // Exemplo de uso:
     * router.post('/logout', AutenticacaoController.logout);
     */
    static async logout(req, res) {
        req.usuario = null;
        res.clearCookie('refreshToken');
        res.status(200).json({ message: 'Logout efetuado com sucesso' });
    }
}

module.exports = AutenticacaoController;