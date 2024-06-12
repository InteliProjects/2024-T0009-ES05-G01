const bodyParser = require('body-parser');
const autenticacaoRoute = require('./autenticacaoRoute');
const auth = require('../middlewares/autenticacaoMiddleware');
const usuarioRoute = require('./usuarioRoute.js');
const responsavelRouter = require('./responsavelRoute');
const oficinaRoute = require('./oficinaRoute');
const ongRoute = require('./ongRoute');
const turmaRouter = require('./turmaRoute');
const aulasRouter = require('./aulaRoute');

/**
 * Função responsável por carregar todas as rotas da aplicação
 * @date 20/02/2024 - 14:45:39
 *
 * @export routes
 * @param {Express} app
 * @returns {void}
 */
function routes(app) {
    app.use(bodyParser.json());
    app.get('/', function (req, res) {
        res.status(200).json({ message: 'Back-end A.S.A.S em execução...' });
    });
    app.use(autenticacaoRoute);
    app.use(auth);
    app.use(usuarioRoute);
    app.use(responsavelRouter);
    app.use(oficinaRoute);
    app.use(ongRoute);
    app.use(turmaRouter);
    app.use(aulasRouter);
};

module.exports = routes;