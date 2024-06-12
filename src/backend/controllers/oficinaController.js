const Joi = require("joi");
const OficinaService = require("../services/oficinaService.js");

const oficinaService = new OficinaService();

module.exports = class OficinaController {
  /**
   * Obtém uma lista de todas as oficinas. Retorna um objeto JSON com a lista de oficinas e um status 200.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a lista de oficinas com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a lista de oficinas é enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.get('/', OficinaController.getAll);
   */
  static async getAllByOng(req, res) {
    const { idOng } = req.params;

    const oficinas = await oficinaService.getAllByOng(idOng);

    res.status(200).json({ oficinas });
  }

  /**
   * Obtém uma oficina pelo ID. Retorna um objeto JSON com a oficina e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da oficina.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a oficina com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a oficina é enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.get('/:id', OficinaController.getById);
   */
  static async getById(req, res) {
    const { id } = req.params;

    try {
      const oficina = await oficinaService.getById(Number(id));

      res.status(200).json({ oficina });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  /**
   * Cria uma nova oficina. Retorna um objeto JSON com a oficina criada e um status 201.
   * Em caso de erro, retorna um erro 400 com detalhes do erro.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados da nova oficina.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a oficina criada com status 201.
   * @returns {Promise<void>} Uma promessa que resolve quando a oficina é criada e enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.post('/', OficinaController.create);
   */
  static async create(req, res) {
    // Validação do corpo da requisição
    const schema = Joi.object({
      nome: Joi.string().required(),
      descricao: Joi.string().required(),
      tema: Joi.string().required(),
      data_inicio: Joi.date().required(),
      data_fim: Joi.date().required(),
      id_ong: Joi.number().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const newOficina = await oficinaService.create(value);

      res.status(201).json({ oficina: newOficina });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Atualiza uma oficina. Retorna um objeto JSON com a oficina atualizada e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados da oficina a ser atualizada.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a oficina atualizada com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a oficina é atualizada e enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.put('/:id', OficinaController.update);
   */
  static async update(req, res) {
    const { id } = req.params;

    // Validação do corpo da requisição
    const schema = Joi.object({
      nome: Joi.string(),
      descricao: Joi.string(),
      tema: Joi.string(),
      data_inicio: Joi.date(),
      data_fim: Joi.date(),
      id_ong: Joi.number(),
    }).or('nome', 'descricao', 'tema', 'data_inicio', 'data_fim', 'id_ong');

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const updatedOficina = await oficinaService.update(Number(id), value);

      res.status(200).json({ oficina: updatedOficina });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  /**
   * Deleta uma oficina pelo ID. Retorna um status 204.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da oficina a ser deletada.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar um status 204.
   * @returns {Promise<void>} Uma promessa que resolve quando o status 204 é enviado ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.delete('/:id', OficinaController.delete);
   */
  static async delete(req, res) {
    const { id } = req.params;

    try {
      await oficinaService.delete(Number(id));

      res.status(204).end();
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
};
