const { Router } = require('express');
const usuarioController = require('../controllers/usuarioController.js');
const validaPermissoes = require('../middlewares/permissaoMiddleware.js');

const router = Router()

router
  .get('/usuarios', validaPermissoes(['*']), usuarioController.getAllByPerfil)
  .get('/usuarios/oficinas',  validaPermissoes(['*']), usuarioController.getOficinasByUsuario)
  .get('/usuarios/:id', validaPermissoes(['*']), usuarioController.getById)
  .post('/usuarios', validaPermissoes(['*']), usuarioController.create)
  .put('/usuarios/:id', validaPermissoes(['*']), usuarioController.update)
  .delete('/usuarios/:id', validaPermissoes(['*']), usuarioController.delete);

module.exports = router;