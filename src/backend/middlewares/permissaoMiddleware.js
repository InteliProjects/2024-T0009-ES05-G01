module.exports = validaPermissoes = (permissoes) => {
    return (req, res, next) => {

        const tipoUsuario = req.usuario.perfil; // array de strings

        if (permissoes[0] === '*') {
            return next();
        }

        const temPermissao = permissoes.some((permissao) => tipoUsuario.includes(permissao));

        if (!temPermissao) {
            return res.status(403).send({ message: 'Acesso negado. Permissões insuficientes.' });
        }

        next();
    };
};