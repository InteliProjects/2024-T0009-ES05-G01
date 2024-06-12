const { Router } = require('express');
const aulaController = require('../controllers/aulaController');
const validaPermissoes = require('../middlewares/permissaoMiddleware.js');

const router = Router();

router
    .get('/aulas/turmas/:idTurma', validaPermissoes(['*']), aulaController.getAllByTurma)
    .get('/aulas/:id', validaPermissoes(['*']), aulaController.getById)
    .get('/aulas/:id/presencas', validaPermissoes(['*']), aulaController.getPresencas)
    .post('/aulas', validaPermissoes(['prof']), aulaController.create)
    .put('/aulas/:id', validaPermissoes(['prof']), aulaController.update)
    .post('/aulas/:id/presencas', validaPermissoes(['prof']), aulaController.insertPresencas);


module.exports = router;