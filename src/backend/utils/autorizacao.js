const perfilAutorizado = {
  ADMIN: {
    GET: true,
    POST: true,
    PUT: true,
    DELETE: ['LIDER']
  },
  PROF: {
    GET: ['LIDER', 'BENEFICIADO'],
    POST: ['BENEFICIADO'],
    PUT: ['BENEFICIADO'],
    DELETE: ['BENEFICIADO']
  },
  LIDER: {
    GET: ['PROF', 'LIDER', 'BENEFICIADO'],
    POST: ['PROF', 'BENEFICIADO'],
    PUT: ['PROF', 'BENEFICIADO'],
    DELETE: ['PROF', 'BENEFICIADO']
  }
};

/**
 * Verifica se o usuário tem permissão para uma determinada ação.
 * @param {string[]} user - Os perfis do usuário.
 * @param {string} action - Ação a ser verificada (GET, POST, PUT, DELETE).
 * @param {string[]} perfil - Os perfis do alvo da ação.
 * @returns {boolean} - Retorna true se o usuário tem permissão para a ação.
 */
function verificarAutorizacao(user, action, perfil) {
  return user.some(userPerfil => {
    if (perfilAutorizado[userPerfil] && perfilAutorizado[userPerfil][action]) {
      const allowedPerfis = perfilAutorizado[userPerfil][action];
      if (Array.isArray(allowedPerfis)) {
        return allowedPerfis.some(perfil => perfil.includes(perfil));
      }
      return true;
    }
    return false;
  });
}

module.exports = {
  verificarAutorizacao
};
