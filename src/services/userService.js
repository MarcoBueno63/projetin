// Sistema de usuários aprimorado
export const UserService = {
  // Registrar novo usuário
  registrarUsuario: (dadosUsuario) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Verificar se email já existe
    const emailExiste = usuarios.find(u => u.email === dadosUsuario.email);
    if (emailExiste) {
      throw new Error('Email já cadastrado');
    }
    
    const novoUsuario = {
      id: Date.now().toString(),
      ...dadosUsuario,
      dataCriacao: new Date().toISOString(),
      ativo: true,
      perfil: dadosUsuario.tipo || 'usuario',
      configuracoes: {
        notificacoes: true,
        tema: 'claro',
        idioma: 'pt-BR'
      }
    };
    
    usuarios.push(novoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    return novoUsuario;
  },

  // Login de usuário
  login: (email, senha) => {
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (!usuario) {
      throw new Error('Credenciais inválidas');
    }
    
    if (!usuario.ativo) {
      throw new Error('Usuário inativo');
    }
    
    // Salvar sessão
    const sessao = {
      ...usuario,
      loggedIn: true,
      ultimoLogin: new Date().toISOString()
    };
    
    localStorage.setItem('usuario', JSON.stringify(sessao));
    localStorage.setItem('usuarioAtual', usuario.id);
    
    return sessao;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('usuario');
    localStorage.removeItem('usuarioAtual');
  },

  // Obter usuário atual
  getUsuarioAtual: () => {
    return JSON.parse(localStorage.getItem('usuario'));
  },

  // Atualizar perfil
  atualizarPerfil: (dadosAtualizados) => {
    const usuarioAtual = UserService.getUsuarioAtual();
    if (!usuarioAtual) return null;
    
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const index = usuarios.findIndex(u => u.id === usuarioAtual.id);
    
    if (index !== -1) {
      usuarios[index] = { ...usuarios[index], ...dadosAtualizados };
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
      
      const usuarioAtualizado = { ...usuarioAtual, ...dadosAtualizados };
      localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado));
      
      return usuarioAtualizado;
    }
    
    return null;
  },

  // Gerenciar dados por usuário
  salvarDadosUsuario: (chave, dados) => {
    const usuarioAtual = UserService.getUsuarioAtual();
    if (!usuarioAtual) return;
    
    const chaveCompleta = `${chave}_${usuarioAtual.id}`;
    localStorage.setItem(chaveCompleta, JSON.stringify(dados));
  },

  obterDadosUsuario: (chave) => {
    const usuarioAtual = UserService.getUsuarioAtual();
    if (!usuarioAtual) return null;
    
    const chaveCompleta = `${chave}_${usuarioAtual.id}`;
    return JSON.parse(localStorage.getItem(chaveCompleta));
  }
};

// Serviço de compartilhamento de dados
export const SharingService = {
  // Compartilhar relatório com médico
  compartilharRelatorio: (dadosRelatorio, emailMedico) => {
    const compartilhamentos = JSON.parse(localStorage.getItem('compartilhamentos')) || [];
    
    const novoCompartilhamento = {
      id: Date.now().toString(),
      tipo: 'relatorio',
      dados: dadosRelatorio,
      compartilhadoPor: UserService.getUsuarioAtual().id,
      compartilhadoCom: emailMedico,
      dataCompartilhamento: new Date().toISOString(),
      ativo: true,
      codigoAcesso: Math.random().toString(36).substring(2, 15)
    };
    
    compartilhamentos.push(novoCompartilhamento);
    localStorage.setItem('compartilhamentos', JSON.stringify(compartilhamentos));
    
    return novoCompartilhamento.codigoAcesso;
  },

  // Acessar dados compartilhados
  acessarCompartilhamento: (codigoAcesso) => {
    const compartilhamentos = JSON.parse(localStorage.getItem('compartilhamentos')) || [];
    return compartilhamentos.find(c => c.codigoAcesso === codigoAcesso && c.ativo);
  }
};

// Sistema de notificações
export const NotificationService = {
  // Criar notificação
  criarNotificacao: (tipo, titulo, mensagem, usuarioId = null) => {
    const notificacoes = JSON.parse(localStorage.getItem('notificacoes')) || [];
    const usuarioAtual = UserService.getUsuarioAtual();
    
    const novaNotificacao = {
      id: Date.now().toString(),
      tipo, // info, warning, error, success
      titulo,
      mensagem,
      usuarioId: usuarioId || usuarioAtual?.id,
      dataEmissao: new Date().toISOString(),
      lida: false
    };
    
    notificacoes.push(novaNotificacao);
    localStorage.setItem('notificacoes', JSON.stringify(notificacoes));
    
    return novaNotificacao;
  },

  // Obter notificações do usuário
  obterNotificacoes: (usuarioId = null) => {
    const usuarioAtual = UserService.getUsuarioAtual();
    const targetUserId = usuarioId || usuarioAtual?.id;
    
    const notificacoes = JSON.parse(localStorage.getItem('notificacoes')) || [];
    return notificacoes.filter(n => n.usuarioId === targetUserId);
  },

  // Marcar como lida
  marcarComoLida: (notificacaoId) => {
    const notificacoes = JSON.parse(localStorage.getItem('notificacoes')) || [];
    const index = notificacoes.findIndex(n => n.id === notificacaoId);
    
    if (index !== -1) {
      notificacoes[index].lida = true;
      localStorage.setItem('notificacoes', JSON.stringify(notificacoes));
    }
  }
};
