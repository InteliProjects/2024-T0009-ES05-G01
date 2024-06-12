const UsuarioRepository = require('../repositories/usuarioRepository.js');
const { getCamposPeloPerfil } = require('../utils/usuario.js');

const usuarioRepository = new UsuarioRepository();

module.exports = class UsuarioService {
  async getAllByPerfil(perfil) {
    const campos = getCamposPeloPerfil(perfil);
    const usuarios = await usuarioRepository.getAllByPerfil(perfil, campos);

    if (!usuarios) {
      throw new Error('Usuários não encontrados!');
    }

    return usuarios;
  }

  async getByIdAndPerfil(id, perfil) {
    const campos = getCamposPeloPerfil(perfil);
    const usuarios = await usuarioRepository.getByIdAndPerfil(id, campos);

    if (!usuarios) {
      throw new Error('Usuários não encontrados!');
    }

    return usuarios;
  }

  async getById(id) {
    const usuario = await usuarioRepository.getById(id);

    if (!usuario) {
      throw new Error('Usuário não encontrado!');
    }

    return usuario;
  }

  async getOficinasByUsuario(userId) {
    try {
      const oficinas = await usuarioRepository.getOficinasByUsuario(userId);
      return oficinas;
    } catch (error) {
      throw new Error('Erro ao obter oficinas do usuário');
    }
  }
  async create(usuario) {
    const { perfil, ...dataUsuario } = usuario;

    const { id } = await usuarioRepository.getPermissao(perfil);

    if (!id) {
      throw new Error('Perfil não encontrado!');
    }

    const newUsuario = await usuarioRepository.create(dataUsuario);

    if (!newUsuario) {
      throw new Error('Erro ao criar usuário!');
    }

    await usuarioRepository.createUsuarioPermissao(newUsuario.id, id)

    return newUsuario;
  }

  async update(id, usuario) {
    const updatedUsuario = await usuarioRepository.update(id, usuario);

    if (!updatedUsuario) {
      throw new Error('Erro ao atualizar usuário!');
    }

    return updatedUsuario;
  }

  async delete(id) {
    return await usuarioRepository.delete(id);
  }
}
