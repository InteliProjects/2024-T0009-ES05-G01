const Joi = require('joi');
const UsuarioService = require('../services/usuarioService.js');
const { verificarAutorizacao } = require('../utils/autorizacao.js');

const usuarioService = new UsuarioService();

module.exports = class UsuarioController {
  /**
   * Obtém uma lista de todos os usuários de um perfil específico. Retorna um objeto JSON com a lista de usuários e um status 200.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o perfil dos usuários a serem retornados.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a lista de usuários com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a lista de usuários é enviada ao cliente.
 
   * @example
   * // Exemplo de uso:
   * router.get('/?perfil=PROF', UsuarioController.getAllByPerfil);
   * 
   */
  static async getAllByPerfil(req, res) {
    const perfil = req.query.perfil.toUpperCase();
    const user = req.usuario.perfil.map(p => p.toUpperCase());

    const schema = Joi.object({
      perfil: Joi.string().uppercase().valid('PROF', 'LIDER', 'BENEFICIADO').required(),
    });

    try {
      await schema.validateAsync(req.query);

      const autorizado = verificarAutorizacao(user, 'GET', perfil);

      if (!autorizado) {
        return res.status(401).json({ message: 'Usuário não autorizado!' });
      }

      const usuarios = await usuarioService.getAllByPerfil(perfil);

      return res.status(200).json({ usuarios });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Obtém um usuário pelo ID. Retorna um objeto JSON com o usuário e um status 200.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID do usuário.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o usuário com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando o usuário é enviado ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.get('/:id', UsuarioController.getById);
   */
  static async getById(req, res) {
    const id = req.params.id;
    const user = req.usuario.perfil.map(p => p.toUpperCase());

    try {
      let usuario = await usuarioService.getById(id);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      const perfil = usuario['permissoes'][0]['perfil'];
      const autorizado = verificarAutorizacao(user, 'GET', perfil);

      if (!autorizado) {
        return res.status(401).json({ message: 'Usuário não autorizado!' });
      }

      usuario = await usuarioService.getByIdAndPerfil(id, perfil);

      return res.status(200).json({ usuario });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  /**
  * Obtém as oficinas de um usuário. Retorna um objeto JSON com as oficinas e um status 200.
  * 
  * @date 3/2/2024 - 12:20:25 PM
  * 
  * @static
  * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID do usuário.
  * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar as oficinas com status 200.
  * @returns {Promise<void>} Uma promessa que resolve quando as oficinas são enviadas ao cliente.
  * 
  * @example
  * // Exemplo de uso:
  * router.get('/:id/oficinas', UsuarioController.getOficinasByUsuario);
  */
  static async getOficinasByUsuario(req, res) {
    const userId = req.usuario.id;

    try {
      const oficinas = await usuarioService.getOficinasByUsuario(userId);

      return res.status(200).json({ oficinas });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Cria um novo usuário. Retorna um objeto JSON com o usuário criado e um status 201.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados do novo usuário.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o usuário criado com status 201.
   * @returns {Promise<void>} Uma promessa que resolve quando o usuário é enviado ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.post('/', UsuarioController.create);
   */
  static async create(req, res) {
    const user = req.usuario.perfil.map(p => p.toUpperCase());
    const schema = Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      genero: Joi.string().required(),
      senha: Joi.string().required(),
      rg: Joi.string().required(),
      telefone: Joi.string(),
      cpf: Joi.string(),
      data_nasc: Joi.date().required(),
      profissao: Joi.string(),
      nacionalidade: Joi.string(),
      escolaridade: Joi.string(),
      identidade: Joi.string(),
      naturalidade: Joi.string(),
      etnia: Joi.string(),
      estado_civil: Joi.string(),
      id_ong: Joi.number().integer().required(),
      data_inicio: Joi.date().when('perfil', { is: 'PROF', then: Joi.required() }),
      area_atuacao: Joi.string().when('perfil', { is: 'PROF', then: Joi.required() }),
      qualificacoes: Joi.string().when('perfil', { is: 'PROF', then: Joi.required() }),
      turno_inicio: Joi.string().when('perfil', { is: 'PROF', then: Joi.required() }),
      turno_fim: Joi.string().when('perfil', { is: 'PROF', then: Joi.required() }),
      especialidade: Joi.string().when('perfil', { is: 'LIDER', then: Joi.required() }),
      renda: Joi.number().when('perfil', { is: 'BENEFICIADO', then: Joi.required() }),
      situacao: Joi.string().when('perfil', { is: 'BENEFICIADO', then: Joi.required() }),
      perfil: Joi.string().uppercase().valid('PROF', 'LIDER', 'BENEFICIADO', 'ADMIN').required(),
      voluntariado: Joi.boolean().when('perfil', { is: 'LIDER', then: Joi.required() }),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      console.log(error);
      return res.status(400).json({ message: error.message });
    }

    try {
      const autorizado = verificarAutorizacao(user, 'POST', value.perfil);

      if (!autorizado) {
        return res.status(401).json({ message: 'Usuário não autorizado!' });
      }

      const usuario = await usuarioService.create(value);

      return res.status(201).json({ usuario });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Atualiza um usuário. Retorna um objeto JSON com o usuário atualizado e um status 200.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados do usuário a ser atualizado.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o usuário atualizado com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando o usuário é enviado ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.put('/:id', UsuarioController.update);
   */
  static async update(req, res) {
    const id = req.params.id;
    const user = req.usuario.perfil.map(p => p.toUpperCase());
    const schema = Joi.object({
      nome: Joi.string(),
      genero: Joi.string(),
      email: Joi.string().email(),
      senha: Joi.string(),
      rg: Joi.string(),
      telefone: Joi.string(),
      cpf: Joi.string(),
      data_nasc: Joi.date(),
      profissao: Joi.string(),
      nacionalidade: Joi.string(),
      escolaridade: Joi.string(),
      identidade: Joi.string(),
      naturalidade: Joi.string(),
      etnia: Joi.string(),
      estado_civil: Joi.string(),
      data_inicio: Joi.date(),
      area_atuacao: Joi.string(),
      qualificacoes: Joi.string(),
      turno_inicio: Joi.string(),
      turno_fim: Joi.string(),
      especialidade: Joi.string(),
      renda: Joi.number(),
      situacao: Joi.string(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    try {
      const usuario = await usuarioService.getById(id);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      const perfil = usuario['permissoes'][0]['perfil'];
      const autorizado = verificarAutorizacao(user, 'PUT', perfil);

      if (!autorizado) {
        return res.status(401).json({ message: 'Usuário não autorizado!' });
      }

      const usuarioAtualizado = await usuarioService.update(Number(id), value);

      return res.status(200).json({ usuarioAtualizado });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  /**
   * Deleta um usuário pelo ID. Retorna um status 204.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID do usuário a ser deletado.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o status 204.
   * @returns {Promise<void>} Uma promessa que resolve quando o status 204 é enviado ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.delete('/:id', UsuarioController.delete);
   */
  static async delete(req, res) {
    const id = req.params.id;
    const user = req.usuario.perfil.map(p => p.toUpperCase());

    console.log(user);

    try {
      const usuario = await usuarioService.getById(id);

      if (!usuario) {
        return res.status(404).json({ message: 'Usuário não encontrado!' });
      }

      const perfil = usuario['permissoes'][0]['perfil'];
      const autorizado = verificarAutorizacao(user, 'DELETE', perfil);

      if (!autorizado) {
        console.log('Usuário não autorizado!');
        console.log(perfil);
        return res.status(401).json({ message: 'Usuário não autorizado!' });
      }

      await usuarioService.delete(Number(id));

      res.status(204).end();
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
}