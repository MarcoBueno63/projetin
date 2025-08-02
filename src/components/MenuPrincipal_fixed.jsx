import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuPrincipal.css';

const MenuPrincipal = () => {
  const navigate = useNavigate();
  
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [menuAtivo, setMenuAtivo] = useState('principal');

  useEffect(() => {
    // Verificar se usuário está logado
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (!usuario || !usuario.loggedIn) {
      navigate('/');
      return;
    }
    setDadosUsuario(usuario);
    
    // Definir menu ativo baseado no tipo de usuário
    if (usuario.tipo === 'admin') {
      setMenuAtivo('admin');
    } else {
      setMenuAtivo('principal');
    }
  }, [navigate]);

  // Filtrar funcionalidades baseadas nas permissões do usuário
  const getFuncionalidadesPermitidas = (funcionalidades) => {
    if (!dadosUsuario || !dadosUsuario.permissoes) return [];
    
    return funcionalidades.filter(func => 
      dadosUsuario.permissoes.some(permissao => 
        func.permissoes.includes(permissao)
      )
    );
  };

  const funcionalidadesPrincipais = [
    {
      id: 'anamnese',
      titulo: 'Anamnese Integrativa',
      descricao: 'Preencher questionário completo de saúde',
      icone: '📋',
      rota: '/anamnese-integrativa',
      cor: '#4CAF50',
      permissoes: ['usuario', 'medico', 'admin'],
      ordem: 1,
      status: 'disponivel'
    },
    {
      id: 'exames',
      titulo: 'Importar Exames',
      descricao: 'Fazer upload de exames médicos',
      icone: '📊',
      rota: '/exames',
      cor: '#2196F3',
      permissoes: ['usuario', 'medico', 'admin'],
      ordem: 2,
      status: 'disponivel'
    },
    {
      id: 'analise-ia',
      titulo: 'Análise IA',
      descricao: 'Solicitar análise inteligente dos dados',
      icone: '🤖',
      rota: '/ia-analise',
      cor: '#FF9800',
      permissoes: ['usuario', 'medico', 'admin'],
      ordem: 3,
      status: 'disponivel'
    },
    {
      id: 'relatorio',
      titulo: 'Relatório Médico',
      descricao: 'Gerar relatório completo da análise',
      icone: '📋',
      rota: '/relatorio',
      cor: '#9C27B0',
      permissoes: ['usuario', 'medico', 'admin'],
      ordem: 4,
      status: 'disponivel'
    },
    {
      id: 'medico',
      titulo: 'Indicação Médica',
      descricao: 'Encontrar médico especialista',
      icone: '👨‍⚕️',
      rota: '/medico',
      cor: '#009688',
      permissoes: ['usuario', 'medico', 'admin'],
      ordem: 5,
      status: 'disponivel'
    },
    {
      id: 'consulta',
      titulo: 'Agendar Consulta',
      descricao: 'Marcar consulta com especialista',
      icone: '📅',
      rota: '/agendar',
      cor: '#E91E63',
      permissoes: ['usuario', 'medico', 'admin'],
      ordem: 6,
      status: 'disponivel'
    },
    {
      id: 'historico',
      titulo: 'Histórico Médico',
      descricao: 'Visualizar histórico completo',
      icone: '📖',
      rota: '/historico',
      cor: '#607D8B',
      permissoes: ['usuario', 'medico', 'admin'],
      ordem: 7,
      status: 'disponivel'
    },
    {
      id: 'medicamentos',
      titulo: 'Medicamentos',
      descricao: 'Gerenciar medicamentos e lembretes',
      icone: '💊',
      rota: '/medicamentos',
      cor: '#795548',
      permissoes: ['usuario', 'medico', 'admin'],
      ordem: 8,
      status: 'disponivel'
    }
  ];

  const menuMedico = [
    {
      id: 'consultas-medico',
      titulo: 'Minhas Consultas',
      descricao: 'Gerenciar agenda e consultas médicas',
      icone: '📅',
      rota: '/medico/consultas',
      permissoes: ['medico', 'admin']
    },
    {
      id: 'pacientes-medico',
      titulo: 'Meus Pacientes',
      descricao: 'Visualizar e gerenciar pacientes',
      icone: '👥',
      rota: '/medico/pacientes',
      permissoes: ['medico', 'admin']
    },
    {
      id: 'prescricoes',
      titulo: 'Prescrições',
      descricao: 'Criar e gerenciar prescrições médicas',
      icone: '📝',
      rota: '/medico/prescricoes',
      permissoes: ['medico', 'admin']
    },
    {
      id: 'laudos',
      titulo: 'Laudos Médicos',
      descricao: 'Elaborar laudos e pareceres',
      icone: '📋',
      rota: '/medico/laudos',
      permissoes: ['medico', 'admin']
    },
    {
      id: 'ia-diagnostico',
      titulo: 'IA para Diagnóstico',
      descricao: 'Assistente de IA para diagnósticos',
      icone: '🤖',
      rota: '/medico/ia-diagnostico',
      permissoes: ['medico', 'admin']
    },
    {
      id: 'exames-medico',
      titulo: 'Análise de Exames',
      descricao: 'Revisar e analisar exames dos pacientes',
      icone: '🔬',
      rota: '/medico/exames',
      permissoes: ['medico', 'admin']
    },
    {
      id: 'relatorios-medico',
      titulo: 'Relatórios Médicos',
      descricao: 'Gerar relatórios de pacientes e estatísticas',
      icone: '📊',
      rota: '/medico/relatorios',
      permissoes: ['medico', 'admin']
    },
    {
      id: 'telemedicina',
      titulo: 'Telemedicina',
      descricao: 'Consultas online e chat com pacientes',
      icone: '💻',
      rota: '/medico/telemedicina',
      permissoes: ['medico', 'admin']
    }
  ];

  const menuAdministrativo = [
    {
      id: 'admin-dashboard',
      titulo: 'Dashboard Admin',
      descricao: 'Painel administrativo principal',
      icone: '🏠',
      rota: '/admin',
      permissoes: ['admin']
    },
    {
      id: 'cadastros',
      titulo: 'Cadastros',
      descricao: 'Gerenciar usuários, médicos e pacientes',
      icone: '👥',
      rota: '/admin/cadastros',
      permissoes: ['admin']
    },
    {
      id: 'estatisticas',
      titulo: 'Estatísticas',
      descricao: 'Visualizar dados e métricas do sistema',
      icone: '📊',
      rota: '/estatisticas',
      permissoes: ['admin']
    },
    {
      id: 'configuracoes',
      titulo: 'Configurações',
      descricao: 'Configurar sistema e preferências',
      icone: '⚙️',
      rota: '/configuracoes',
      permissoes: ['admin']
    },
    {
      id: 'usuarios',
      titulo: 'Gerenciar Usuários',
      descricao: 'Adicionar, editar e remover usuários',
      icone: '👤',
      rota: '/admin/usuarios',
      permissoes: ['admin']
    },
    {
      id: 'medicos',
      titulo: 'Gerenciar Médicos',
      descricao: 'Cadastrar e gerenciar médicos',
      icone: '👨‍⚕️',
      rota: '/admin/medicos',
      permissoes: ['admin']
    }
  ];

  const handleNavegacao = (rota) => {
    navigate(rota);
  };

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const renderFuncionalidades = (funcionalidades, titulo) => {
    const funcionalidadesPermitidas = getFuncionalidadesPermitidas(funcionalidades);
    
    if (funcionalidadesPermitidas.length === 0) return null;

    // Ordenar funcionalidades por ordem (se existir)
    const funcionalidadesOrdenadas = funcionalidadesPermitidas.sort((a, b) => {
      if (a.ordem && b.ordem) {
        return a.ordem - b.ordem;
      }
      return 0;
    });
    
    return (
      <div className="funcionalidades-section">
        <h2>{titulo}</h2>
        <div className="funcionalidades-grid">
          {funcionalidadesOrdenadas.map((func) => (
            <div
              key={func.id}
              className={`funcionalidade-card ${func.status || 'disponivel'}`}
              onClick={() => handleNavegacao(func.rota)}
              style={{ '--cor-destaque': func.cor }}
            >
              {func.ordem && (
                <div className="funcionalidade-ordem">
                  <span className="ordem-numero">{func.ordem}</span>
                </div>
              )}
              <div className="funcionalidade-icon">{func.icone}</div>
              <div className="funcionalidade-info">
                <h3>{func.titulo}</h3>
                <p>{func.descricao}</p>
                {func.status && (
                  <div className={`status-indicator ${func.status}`}>
                    {func.status === 'disponivel' && '✅ Disponível'}
                    {func.status === 'em-breve' && '⏳ Em breve'}
                    {func.status === 'beta' && '🧪 Beta'}
                    {func.status === 'desenvolvimento' && '🔧 Em desenvolvimento'}
                  </div>
                )}
              </div>
              <div className="funcionalidade-arrow">→</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const getUserTypeDisplay = (tipo) => {
    switch(tipo) {
      case 'admin': return '👨‍💼 Administrador';
      case 'medico': return '👨‍⚕️ Médico';
      case 'usuario': return '👤 Usuário';
      default: return '👤 Usuário';
    }
  };

  const shouldShowTab = (tab) => {
    if (!dadosUsuario) return false;
    
    if (tab === 'admin') {
      return dadosUsuario.permissoes.includes('admin');
    }
    
    if (tab === 'medico') {
      return dadosUsuario.permissoes.includes('medico');
    }
    
    return true; // tab principal sempre visível
  };

  if (!dadosUsuario) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="menu-principal">
      <div className="menu-header">
        <div className="user-info">
          <div className="user-avatar">
            {dadosUsuario.nome?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="user-details">
            <h1>Olá, {dadosUsuario.nome || 'Usuário'}!</h1>
            <p>{getUserTypeDisplay(dadosUsuario.tipo)}</p>
            <small>Bem-vindo ao HealthSystem</small>
          </div>
        </div>
        <div className="menu-actions">
          <button 
            className={`menu-tab ${menuAtivo === 'principal' ? 'active' : ''}`}
            onClick={() => setMenuAtivo('principal')}
          >
            📋 Funcionalidades
          </button>
          
          {shouldShowTab('medico') && (
            <button 
              className={`menu-tab ${menuAtivo === 'medico' ? 'active' : ''}`}
              onClick={() => setMenuAtivo('medico')}
            >
              👨‍⚕️ Médico
            </button>
          )}
          
          {shouldShowTab('admin') && (
            <button 
              className={`menu-tab ${menuAtivo === 'admin' ? 'active' : ''}`}
              onClick={() => setMenuAtivo('admin')}
            >
              👨‍💼 Administrativo
            </button>
          )}
          
          <button className="logout-btn" onClick={handleLogout}>
            🚪 Sair
          </button>
        </div>
      </div>

      <div className="menu-content">
        {menuAtivo === 'principal' && renderFuncionalidades(funcionalidadesPrincipais, 'Funcionalidades Principais')}
        {menuAtivo === 'medico' && renderFuncionalidades(menuMedico, 'Área Médica')}
        {menuAtivo === 'admin' && renderFuncionalidades(menuAdministrativo, 'Área Administrativa')}
      </div>

      <div className="menu-footer">
        <p>© 2025 HealthSystem - Sistema de Gestão de Saúde</p>
        <div className="footer-links">
          <a href="/ajuda">Ajuda</a>
          <a href="/suporte">Suporte</a>
          <a href="/sobre">Sobre</a>
        </div>
      </div>
    </div>
  );
};

export default MenuPrincipal;
