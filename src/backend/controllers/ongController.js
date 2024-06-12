const Joi = require('joi');
const OngService = require('../services/ongService.js');

const ongService = new OngService();

module.exports = class OngController {
  /**
   * Obtém uma lista de todas as ONGs. Retorna um objeto JSON com a lista de ONGs e um status 200.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a lista de ONGs com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a lista de ONGs é enviada ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.get('/', OngController.getAll);
   */
  static async getAll(req, res) {
    const ongs = await ongService.getAll();
    res.status(200).json({ ongs });
  }

  /**
   * Obtém uma ONG pelo ID. Retorna um objeto JSON com a ONG e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da ONG.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a ONG com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a ONG é enviada ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.get('/:id', OngController.getById);
   */
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const ong = await ongService.getById(Number(id));
      res.status(200).json({ ong });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * Obtém uma lista de beneficiados de uma ONG. Retorna um objeto JSON com a lista de beneficiados e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da ONG.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a lista de beneficiados com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a lista de beneficiados é enviada ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.get('/:id/beneficiados', OngController.getBeneficiados);
   *  
   */
  static async getBeneficiados(req, res) {
    try {
      const { id } = req.params;
      const beneficiados = await ongService.getBeneficiados(Number(id));

      res.status(200).json({ beneficiados });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * Cria uma nova ONG. Retorna um objeto JSON com a ONG criada e um status 201.
   * Em caso de erro, retorna um erro 400 com detalhes do erro.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados da nova ONG.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a ONG criada com status 201.
   * @returns {Promise<void>} Uma promessa que resolve quando a ONG é enviada ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.post('/', OngController.create);
   */
  static async create(req, res) {
    // Validação do corpo da requisição
    const schema = Joi.object({
      nome: Joi.string().required(),
      descricao: Joi.string().required().max(100),
      endereco_cidade: Joi.string().required(),
      endereco_estado: Joi.string().required(),
      cnpj: Joi.string().required(),
      telefone: Joi.string().required(),
      email: Joi.string().email().required(),
      imagem: Joi.string(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const newOng = await ongService.create(value);
      res.status(201).json({ ong: newOng });
    } catch (error) {
      res.status(409).json({ error: error.message });
    }
  }

  /**
   * Atualiza uma ONG. Retorna um objeto JSON com a ONG atualizada e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados da ONG a ser atualizada.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a ONG atualizada com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a ONG é atualizada e enviada ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.put('/:id', OngController.update);
   */
  static async update(req, res) {
    const { id } = req.params;

    // Validação do corpo da requisição
    const schema = Joi.object({
      nome: Joi.string(),
      descricao: Joi.string().max(100),
      endereco_cidade: Joi.string(),
      endereco_estado: Joi.string(),
      cnpj: Joi.string(),
      telefone: Joi.string(),
      email: Joi.string().email(),
      imagem: Joi.string(),
    }).or('nome', 'descricao', 'endereco_cidade', 'endereco_estado', 'cnpj', 'telefone', 'email', 'imagem');

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    try {
      const updatedOng = await ongService.update(Number(id), value);
      res.status(200).json({ ong: updatedOng });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * Deleta uma ONG pelo ID. Retorna um status 204.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da ONG a ser deletada.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o status 204.
   * @returns {Promise<void>} Uma promessa que resolve quando o status 204 é enviado ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.delete('/:id', OngController.delete);
   */
  static async delete(req, res) {
    try {
      const { id } = req.params;
      await ongService.delete(Number(id));
      res.status(204).end();
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * Obtém uma lista de professores de uma ONG. Retorna um objeto JSON com a lista de professores e um status 200.
   * 
   * @date 3/2/2024 - 12:20:25 PM
   * 
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da ONG.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a lista de professores com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a lista de professores é enviada ao cliente.
   * 
   * @example
   * // Exemplo de uso:
   * router.get('ongs/:id/professores', OngController.getProfessores);
   */
  static async getProfessores(req, res) {
    try {
      const { id } = req.params;
      const professores = await ongService.getProfessores(Number(id));
      res.status(200).json({ professores: professores });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
