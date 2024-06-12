const { Router } = require('express');
const autenticacaoController = require('../controllers/autenticacaoController');

const router = Router();

router
    .post('/login', autenticacaoController.login)
    .post('/refresh-token', autenticacaoController.refreshToken)
    .post('/logout', autenticacaoController.logout);


module.exports = router;