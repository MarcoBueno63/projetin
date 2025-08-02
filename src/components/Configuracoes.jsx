import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Configuracoes.css';

const Configuracoes = () => {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({});
  const [configuracoes, setConfiguracoes] = useState({
    notificacoes: true,
    lembretesMedicamentos: true,
    compartilhamentoDados: false,
    tema: 'claro',
    idioma: 'pt-BR'
  });
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    // Função para carregar usuário do localStorage
    const carregarUsuario = () => {
      const dadosUsuario = JSON.parse(localStorage.getItem('usuario')) || {};
      setUsuario(dadosUsuario);
    };
    carregarUsuario();
    // Carregar configurações salvas
    const configSalvas = JSON.parse(localStorage.getItem('configuracoes')) || {};
    setConfiguracoes(prev => ({ ...prev, ...configSalvas }));
    // Escutar mudanças no localStorage (de outras abas)
    const handleStorage = (e) => {
      if (e.key === 'usuario') {
        carregarUsuario();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleConfiguracao = (key, value) => {
    setConfiguracoes(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const salvarConfiguracoes = () => {
    setSalvando(true);
    
    // Simular salvamento
    setTimeout(() => {
      localStorage.setItem('configuracoes', JSON.stringify(configuracoes));
      setSalvando(false);
      // TODO: Adicionar feedback visual (Snackbar) para configurações salvas
    }, 1000);
  };

  const resetarConfiguracoes = () => {
    if (window.confirm('Tem certeza que deseja resetar todas as configurações?')) {
      const configPadrao = {
        notificacoes: true,
        lembretesMedicamentos: true,
        compartilhamentoDados: false,
        tema: 'claro',
        idioma: 'pt-BR'
      };
      setConfiguracoes(configPadrao);
      localStorage.setItem('configuracoes', JSON.stringify(configPadrao));
      // TODO: Adicionar feedback visual (Snackbar) para configurações resetadas
    }
  };

  const limparDados = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita.')) {
      const dadosParaLimpar = ['anamnese', 'exames', 'medicamentos', 'analiseIA', 'relatorioMedico'];
      dadosParaLimpar.forEach(key => localStorage.removeItem(key));
      alert('Dados limpos com sucesso!');
    }
  };

  const exportarDados = () => {
    const dados = {
      usuario,
      configuracoes,
      anamnese: JSON.parse(localStorage.getItem('anamnese')) || {},
      exames: JSON.parse(localStorage.getItem('exames')) || [],
      medicamentos: JSON.parse(localStorage.getItem('medicamentos')) || [],
      analiseIA: JSON.parse(localStorage.getItem('analiseIA')) || {},
      relatorioMedico: JSON.parse(localStorage.getItem('relatorioMedico')) || {}
    };

    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dados_healthsystem_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="configuracoes-container">
      <div className="configuracoes-header">
        <button 
          onClick={() => navigate('/menu')}
          className="btn-voltar"
        >
          ← Voltar
        </button>
        <h1>⚙️ Configurações</h1>
      </div>

      <div className="configuracoes-content">
        {/* Botão para recarregar usuário manualmente */}
        <div style={{ textAlign: 'right', marginBottom: 8 }}>
          <button onClick={() => {
            const dadosUsuario = JSON.parse(localStorage.getItem('usuario')) || {};
            setUsuario(dadosUsuario);
          }} style={{ fontSize: 12, padding: '4px 12px', borderRadius: 6, background: '#eee', border: '1px solid #ccc', cursor: 'pointer' }}>
            🔄 Recarregar Usuário
          </button>
        </div>
        {/* Informações do Usuário */}
        <div className="secao-config">
          <h2>👤 Informações do Usuário</h2>
          <div className="info-usuario">
            <div className="campo-info">
              <label>Nome:</label>
              <span>{usuario.nome || 'Não informado'}</span>
            </div>
            <div className="campo-info">
              <label>Email:</label>
              <span>{usuario.email || 'Não informado'}</span>
            </div>
            <div className="campo-info">
              <label>Tipo de Usuário:</label>
              <span>{usuario.tipo || 'Usuário'}</span>
            </div>
            <div className="campo-info">
              <label>Data de Cadastro:</label>
              <span>{usuario.dataCadastro || 'Não informado'}</span>
            </div>
          </div>
        </div>

        {/* Configurações de Notificações */}
        <div className="secao-config">
          <h2>🔔 Notificações</h2>
          <div className="config-item">
            <label className="switch">
              <input
                type="checkbox"
                checked={configuracoes.notificacoes}
                onChange={(e) => handleConfiguracao('notificacoes', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <div className="config-info">
              <h3>Notificações Gerais</h3>
              <p>Receber notificações sobre atualizações e lembretes</p>
            </div>
          </div>

          <div className="config-item">
            <label className="switch">
              <input
                type="checkbox"
                checked={configuracoes.lembretesMedicamentos}
                onChange={(e) => handleConfiguracao('lembretesMedicamentos', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <div className="config-info">
              <h3>Lembretes de Medicamentos</h3>
              <p>Receber lembretes para tomar medicamentos</p>
            </div>
          </div>
        </div>

        {/* Configurações de Privacidade */}
        <div className="secao-config">
          <h2>🔒 Privacidade</h2>
          <div className="config-item">
            <label className="switch">
              <input
                type="checkbox"
                checked={configuracoes.compartilhamentoDados}
                onChange={(e) => handleConfiguracao('compartilhamentoDados', e.target.checked)}
              />
              <span className="slider"></span>
            </label>
            <div className="config-info">
              <h3>Compartilhamento de Dados</h3>
              <p>Permitir compartilhamento de dados anônimos para pesquisa</p>
            </div>
          </div>
        </div>

        {/* Configurações de Aparência */}
        <div className="secao-config">
          <h2>🎨 Aparência</h2>
          <div className="config-item">
            <div className="config-info">
              <h3>Tema</h3>
              <select
                value={configuracoes.tema}
                onChange={(e) => handleConfiguracao('tema', e.target.value)}
                className="select-config"
              >
                <option value="claro">Claro</option>
                <option value="escuro">Escuro</option>
                <option value="auto">Automático</option>
              </select>
            </div>
          </div>

          <div className="config-item">
            <div className="config-info">
              <h3>Idioma</h3>
              <select
                value={configuracoes.idioma}
                onChange={(e) => handleConfiguracao('idioma', e.target.value)}
                className="select-config"
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (US)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gerenciamento de Dados */}
        <div className="secao-config">
          <h2>💾 Gerenciamento de Dados</h2>
          <div className="acoes-dados">
            <button 
              onClick={exportarDados}
              className="btn-exportar"
            >
              📤 Exportar Dados
            </button>
            <button 
              onClick={limparDados}
              className="btn-limpar"
            >
              🗑️ Limpar Todos os Dados
            </button>
          </div>
        </div>

        {/* Sobre o Sistema */}
        <div className="secao-config">
          <h2>ℹ️ Sobre o Sistema</h2>
          <div className="info-sistema">
            <div className="campo-info">
              <label>Versão:</label>
              <span>1.0.0</span>
            </div>
            <div className="campo-info">
              <label>Última Atualização:</label>
              <span>Janeiro 2025</span>
            </div>
            <div className="campo-info">
              <label>Desenvolvedor:</label>
              <span>HealthSystem Team</span>
            </div>
          </div>

          {/* Acesso à administração de fornecedores (apenas admin) */}
          {(usuario.tipo === 'admin' || usuario.tipo === 'fornecedor') && (
            <div style={{ marginTop: 24 }}>
              <button 
                className="btn-admin-fornecedor"
                onClick={() => navigate('/admin-fornecedor')}
                style={{ background: 'linear-gradient(135deg, #4CAF50, #45a049)', color: 'white', padding: '12px 24px', borderRadius: 8, border: 'none', fontWeight: 600, cursor: 'pointer' }}
              >
                🧴 Gerenciar Fornecedores de Suplementos
              </button>
            </div>
          )}
        </div>

        {/* Botões de Ação */}
        <div className="acoes-config">
          <button 
            onClick={salvarConfiguracoes}
            className="btn-salvar"
            disabled={salvando}
          >
            {salvando ? '💾 Salvando...' : '💾 Salvar Configurações'}
          </button>
          <button 
            onClick={resetarConfiguracoes}
            className="btn-reset"
          >
            🔄 Resetar Configurações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Configuracoes;
