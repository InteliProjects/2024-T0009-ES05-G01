const pkg = require('jsonwebtoken');
const dotenv = require('dotenv');

const { verify } = pkg;
dotenv.config();


module.exports = (req, res, next) => {
  let accessToken = req.headers['authorization'];
  let refreshToken = req.headers['x-refresh-token'];

  // remove o Bearer do token
  accessToken = accessToken && accessToken.split(' ')[1];

  if (!accessToken && !refreshToken) {
    return res.status(401).send({ message: 'Acesso negado. Usuário não autenticado.' });
  }

  try {
    // verifica se o accessToken é válido
    const decoded = verify(accessToken, process.env.SECRET);
    // armazena o id do usuário no req
    req.usuario = decoded.usuario;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'Acesso negado. Token inválido.' });
  }
};