const { Router } = require('express');
const responsavelController = require('../controllers/responsavelController.js');
const validaPermissoes = require('../middlewares/permissaoMiddleware.js');

const router = Router()

router
  .get('/responsaveis', validaPermissoes(['*']), responsavelController.getAll)
  .get('/responsaveis/:id', validaPermissoes(['*']), responsavelController.getById)
  .post('/responsaveis', validaPermissoes(['lider', 'professor']), responsavelController.create)
  .put('/responsaveis/:id', validaPermissoes(['lider', 'professor']), responsavelController.update)
  .delete('/responsaveis/:id', validaPermissoes(['lider']), responsavelController.delete);

module.exports = router;