const { Router } = require('express');
const oficinaController = require('../controllers/oficinaController');
const validaPermissoes = require('../middlewares/permissaoMiddleware.js');

const router = Router();

router
    .get('/oficinas/ongs/:idOng', validaPermissoes(['*']), oficinaController.getAllByOng)
    .get('/oficinas/:id', validaPermissoes(['*']), oficinaController.getById)
    .post('/oficinas', validaPermissoes(['admin', 'lider', 'prof']), oficinaController.create)
    .put('/oficinas/:id', validaPermissoes(['lider', 'prof']), oficinaController.update)
    .delete('/oficinas/:id', validaPermissoes(['lider']), oficinaController.delete);


module.exports = router;