function getCamposPeloPerfil(perfil) {
  let campos = ['id', 'nome', 'rg', 'telefone', 'cpf', 'data_nasc', 'profissao', 'nacionalidade', 'escolaridade', 'identidade', 'naturalidade', 'etnia', 'estado_civil'];

  switch (perfil) {
    case 'PROF':
      campos = campos.concat(['data_inicio', 'area_atuacao', 'qualificacoes', 'turno_inicio', 'turno_fim']);
      break;
    case 'LIDER':
      campos = campos.concat(['especialidade']);
      break;
    case 'BENEFICIADO':
      campos = campos.concat(['renda', 'situacao']);
      break;
  }

  return campos;
}

module.exports = {
  getCamposPeloPerfil
};