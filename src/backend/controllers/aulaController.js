const Joi = require("joi");
const AulaService = require("../services/aulaService.js");

const aulaService = new AulaService();

module.exports = class AulaController {
  /**
   * Obtém uma lista de todas as aulas. Retorna um objeto JSON com a lista de aulas e um status 200.
   *
   * @date 13/03/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a lista de aulas com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a lista de aulas é enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.get('/', AulaController.getAll);
   */
  static async getAllByTurma(req, res) {
    const { idTurma } = req.params;

    try {
      const aulas = await aulaService.getAllByTurma(Number(idTurma));

      res.status(200).json({ aulas });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  /**
   * Obtém uma aula pelo ID. Retorna um objeto JSON com a aula e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   *
   * @date 13/03/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo o ID da aula.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a aula com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a aula é enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.get('/:id', AulaController.getById);
   */
  static async getById(req, res) {
    const { id } = req.params;

    try {
      const aula = await aulaService.getById(Number(id));

      res.status(200).json({ aula });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  /**
   * Cria uma nova aula. Retorna um objeto JSON com a aula criada e um status 201.
   * Em caso de erro, retorna um erro 400 com detalhes do erro.
   *
   * @date 13/03/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados da nova aula.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a aula criada com status 201.
   * @returns {Promise<void>} Uma promessa que resolve quando a aula é criada e enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.post('/', AulaController.create);
   */
  static async create(req, res) {
    // Validação do corpo da requisição
    const schema = Joi.object({
      id_turma: Joi.number().required(),
      id_professor: Joi.number().required(),
      dia: Joi.date().required(),
      horario: Joi.string().required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const newaula = await aulaService.create(value);

      res.status(201).json({ aula: newaula });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  /**
   * Atualiza uma aula. Retorna um objeto JSON com a aula atualizada e um status 200.
   * Em caso de erro, retorna um erro 404 com detalhes do erro.
   *
   * @date 13/03/2024 - 12:20:25 PM
   *
   * @static
   * @param {Express.Request} req - O objeto de solicitação do Express, contendo os dados da aula a ser atualizada.
   * @param {Express.Response} res - O objeto de resposta do Express, usado para enviar a aula atualizada com status 200.
   * @returns {Promise<void>} Uma promessa que resolve quando a aula é atualizada e enviada ao cliente.
   *
   * @example
   * // Exemplo de uso:
   * router.put('/:id', AulaController.update);
   */
  static async update(req, res) {
    const { id } = req.params;

    // Validação do corpo da requisição
    const schema = Joi.object({
      id_turma: Joi.number(),
      id_professor: Joi.number(),
      dia: Joi.date(),
      horario: Joi.string(),
    }).or("id_turma", "id_professor", "dia", "horario");

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const updatedaula = await aulaService.update(Number(id), value);

      res.status(200).json({ aula: updatedaula });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async insertPresencas(req, res) {
    const { id } = req.params;

    // o schema precisa ter uma array de ids dos alunos
    const schema = Joi.object({
      presencas: Joi.array().items(Joi.number()).required(),
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      const insertedPresencas = await aulaService.insertPresencas(
        Number(id),
        value.presencas
      );

      res.status(200).json({ presencas: insertedPresencas });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }

  static async getPresencas(req, res) {
    const { id } = req.params;

    try {
      const presencas = await aulaService.getPresencas(Number(id));

      res.status(200).json({ presencas });
    } catch (error) {
      return res.status(404).json({ message: error.message });
    }
  }
};
