const Joi = require("joi");
const TurmaService = require("../services/turmaService.js");

const turmaService = new TurmaService();

module.exports = class TurmaController {
  /**
   * Obtém uma lista de todas as turmas. Retorna um objeto JSON com a lista de turmas e um status 200.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a lista de turmas com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a lista de turmas é enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.get('/', TurmaController.getAll);
   */
  static async getAll(req, res) {
    const turmas = await turmaService.getAll();

    res.status(200).json({ turmas });
  }

  /**
   * Obtém uma lista de todas as turmas de uma oficina. Retorna um objeto JSON com a lista de turmas e um status 200.
   *
   * @date 3/13/2024 - 8:03:33 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da oficina.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a lista de turmas com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a lista de turmas é enviada ao cliente.
   */
  static async getAllByOficina(req, res) {
    const { idOficina } = req.params;

    try {
      const turmas = await turmaService.getAllByOficina(Number(idOficina));

      res.status(200).json({ turmas });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  /**
   * Obtém uma turma pelo ID. Retorna um objeto JSON com a turma e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da turma.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a turma com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a turma é enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.get('/:id', TurmaController.getById);
   */
  static async getById(req, res) {
    const { id } = req.params;

    try {
      const turma = await turmaService.getById(Number(id));

      res.status(200).json({ turma });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  /**
   * Cria uma nova turma. Retorna um objeto JSON com a turma criada e um status 201.
   * Em caso de erro, retorna um erro 400 com detalhes do erro.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados da nova turma.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a turma criada com status 201.
   * @returns {Promise<void>} Uma promessa que resolve quando a turma é criada e enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.post('/', TurmaController.create);
   */
  static async create(req, res) {
    const schema = Joi.object({
      nome: Joi.string().required(),
      id_oficina: Joi.number().min(1).required(),
      local: Joi.string().required(),
      ativo: Joi.boolean().required(),
      vagas: Joi.number().required(),
      beneficiados: Joi.array().items(Joi.number()),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const newTurma = await turmaService.create(value);

      res.status(201).json({ turma: newTurma });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Atualiza uma turma pelo ID. Retorna um objeto JSON com a turma atualizada e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados da turma a ser atualizada.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a turma atualizada com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a turma é atualizada e enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.put('/:id', TurmaController.update);
   */
  static async update(req, res) {
    const { id } = req.params;

    const schema = Joi.object({
      nome: Joi.string(),
      id_oficina: Joi.number().min(1),
      local: Joi.string(),
      ativo: Joi.boolean(),
      vagas: Joi.number(),
      beneficiados: Joi.array().items(Joi.number()),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const updatedTurma = await turmaService.update(Number(id), value);

      res.status(200).json({ turma: updatedTurma });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  /**
   * Deleta uma turma pelo ID. Retorna um status 204.
   *
   * @date 3/2/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da turma a ser deletada.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar o status 204.
   * @returns {Promise<void>} Uma promessa que resolve quando o status 204 é enviado ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.delete('/:id', TurmaController.delete);
   */
  static async delete(req, res) {
    const { id } = req.params;

    try {
      await turmaService.delete(Number(id));

      res.status(204).end();
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
};
