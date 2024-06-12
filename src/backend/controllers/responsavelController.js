const Joi = require("joi");
const ResponsavelService = require("../services/responsavelService.js");

const responsavelService = new ResponsavelService();

module.exports = class ResponsavelController {
  /**
   * Obtém uma lista de todos os responsáveis. Retorna um objeto JSON com a lista de responsáveis e um status 200.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a lista de responsáveis com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a lista de responsáveis é enviada ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.get('/', ResponsavelController.getAll);
   */
  static async getAll(req, res) {
    const responsaveis = await responsavelService.getAll();

    res.status(200).json({ responsaveis });
  }

  /**
   * Obtém um responsável pelo ID. Retorna um objeto JSON com o responsável e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID do responsável.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o responsável com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando o responsável é enviado ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.get('/:id', ResponsavelController.getById);
   */
  static async getById(req, res) {
    const { id } = req.params;
    try {
      const responsavel = await responsavelService.getById(Number(id));

      res.status(200).json({ responsavel });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * Cria um novo responsável. Retorna um objeto JSON com o responsável criado e um status 201.
   * Em caso de erro, retorna um erro 400 com detalhes do erro.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados do responsável.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o responsável criado com status 201.
   * @returns {Promise<void>} Uma promessa que resolve quando o responsável é criado e enviado ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.post('/', ResponsavelController.create);
   */
  static async create(req, res) {
    // Validação do corpo da requisição
    const schema = Joi.object({
      nome: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().required().email(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    try {
      const newResponsavel = await responsavelService.create(value);

      res.status(201).json({ responsavel: newResponsavel });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  /**
   * Atualiza um responsável. Retorna um objeto JSON com o responsável atualizado e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID do responsável e os dados a serem atualizados.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o responsável atualizado com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando o responsável é atualizado e enviado ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.put('/:id', ResponsavelController.update);
   */
  static async update(req, res) {
    const { id } = req.params;

    // Validação do corpo da requisição
    const schema = Joi.object({
      nome: Joi.string(),
      telefone: Joi.string(),
      email: Joi.string().email(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const updateResponsavel = await responsavelService.update(Number(id), value);

      res.status(200).json({ responsavel: updateResponsavel });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }

  /**
   * Deleta um responsável pelo ID. Retorna um status 204.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID do responsável a ser deletado.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o status 204.
   * @returns {Promise<void>} Uma promessa que resolve quando o responsável é deletado.
   * 
   * @example
   * // Exemplo de uso:
   * router.delete('/:id', ResponsavelController.delete);
   */
  static async delete(req, res) {
    const { id } = req.params;

    try {
      await responsavelService.delete(Number(id));

      res.status(204).end();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}