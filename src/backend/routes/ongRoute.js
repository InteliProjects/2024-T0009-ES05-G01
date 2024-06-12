const { Router } = require('express');
const ongController = require('../controllers/ongController.js');
const validaPermissoes = require('../middlewares/permissaoMiddleware.js');

const router = Router()

router
  .get('/ongs', validaPermissoes(['admin', 'lider']), ongController.getAll)
  .get('/ongs/:id', validaPermissoes(['admin', 'lider']), ongController.getById)
  .get('/ongs/:id/professores', validaPermissoes(['admin', 'lider']), ongController.getProfessores)
  .get('/ongs/:id/beneficiados', validaPermissoes(['admin', 'lider']), ongController.getBeneficiados)
  .post('/ongs', validaPermissoes(['admin']), ongController.create)
  .put('/ongs/:id', validaPermissoes(['admin', 'lider']), ongController.update)
  .delete('/ongs/:id', validaPermissoes(['admin']), ongController.delete)

module.exports = router;