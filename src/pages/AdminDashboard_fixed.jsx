import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [usuarios, setUsuarios] = useState([]);
  const [medicos, setMedicos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [stats, setStats] = useState({
    totalUsuarios: 0,
    totalMedicos: 0,
    totalPacientes: 0,
    usuariosAtivos: 0
  });

  // Estados para modais
  const [modalAberto, setModalAberto] = useState(false);
  const [tipoModal, setTipoModal] = useState('');
  const [itemEditando, setItemEditando] = useState(null);
  
  // Estados para formulários
  const [novoUsuario, setNovoUsuario] = useState({
    nome: '',
    email: '',
    senha: '',
    tipo: 'usuario',
    status: 'ativo'
  });

  const [novoMedico, setNovoMedico] = useState({
    nome: '',
    email: '',
    crm: '',
    especialidade: '',
    telefone: '',
    status: 'ativo'
  });

  useEffect(() => {
    if (!sessionStorage.getItem('admin')) {
      navigate('/admin');
      return;
    }
    carregarDados();
  }, [navigate]);

  const carregarDados = () => {
    const usuariosData = JSON.parse(localStorage.getItem('usuarios')) || [];
    const medicosData = JSON.parse(localStorage.getItem('medicos')) || [];
    const pacientesData = JSON.parse(localStorage.getItem('pacientes')) || [];

    setUsuarios(usuariosData);
    setMedicos(medicosData);
    setPacientes(pacientesData);

    setStats({
      totalUsuarios: usuariosData.length,
      totalMedicos: medicosData.length,
      totalPacientes: pacientesData.length,
      usuariosAtivos: usuariosData.filter(u => u.status === 'ativo').length
    });
  };

  const logout = () => {
    sessionStorage.removeItem('admin');
    navigate('/admin');
  };

  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setItemEditando(null);
    setModalAberto(true);
    
    // Resetar formulários
    if (tipo === 'usuario') {
      setNovoUsuario({ nome: '', email: '', senha: '', tipo: 'usuario', status: 'ativo' });
    } else if (tipo === 'medico') {
      setNovoMedico({ nome: '', email: '', crm: '', especialidade: '', telefone: '', status: 'ativo' });
    }
  };

  const fecharModal = () => {
    setModalAberto(false);
    setItemEditando(null);
    setTipoModal('');
  };

  const salvarUsuario = () => {
    if (!novoUsuario.nome || !novoUsuario.email) {
      // TODO: Adicionar feedback visual (Snackbar) para campos obrigatórios
      return;
    }

    const novoId = Date.now();
    const usuario = {
      ...novoUsuario,
      id: novoId,
      dataCadastro: new Date().toISOString()
    };

    const usuariosAtualizados = [...usuarios, usuario];
    setUsuarios(usuariosAtualizados);
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
    
    fecharModal();
    carregarDados();
    // TODO: Adicionar feedback visual (Snackbar) para sucesso
  };

  const salvarMedico = () => {
    if (!novoMedico.nome || !novoMedico.email || !novoMedico.crm) {
      // TODO: Adicionar feedback visual (Snackbar) para campos obrigatórios
      return;
    }

    const novoId = Date.now();
    const medico = {
      ...novoMedico,
      id: novoId,
      dataCadastro: new Date().toISOString()
    };

    const medicosAtualizados = [...medicos, medico];
    setMedicos(medicosAtualizados);
    localStorage.setItem('medicos', JSON.stringify(medicosAtualizados));
    
    fecharModal();
    carregarDados();
    // TODO: Adicionar feedback visual (Snackbar) para sucesso
  };

  const excluirUsuario = (index) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      const usuariosAtualizados = usuarios.filter((_, i) => i !== index);
      setUsuarios(usuariosAtualizados);
      localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
      carregarDados();
    }
  };

  const excluirMedico = (index) => {
    if (window.confirm('Tem certeza que deseja excluir este médico?')) {
      const medicosAtualizados = medicos.filter((_, i) => i !== index);
      setMedicos(medicosAtualizados);
      localStorage.setItem('medicos', JSON.stringify(medicosAtualizados));
      carregarDados();
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>🏥 HealthAdmin</h2>
          <p>Painel Administrativo</p>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={activeTab === 'dashboard' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('dashboard')}
          >
            📊 Dashboard
          </button>
          <button 
            className={activeTab === 'usuarios' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('usuarios')}
          >
            👥 Usuários
          </button>
          <button 
            className={activeTab === 'medicos' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('medicos')}
          >
            🩺 Médicos
          </button>
          <button 
            className={activeTab === 'pacientes' ? 'nav-item active' : 'nav-item'}
            onClick={() => setActiveTab('pacientes')}
          >
            🏥 Pacientes
          </button>
        </nav>
        
        <div className="sidebar-footer">
          <button onClick={logout} className="logout-btn">
            🚪 Sair
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="main-header">
          <h1>
            {activeTab === 'dashboard' && 'Dashboard Administrativo'}
            {activeTab === 'usuarios' && 'Gerenciar Usuários'}
            {activeTab === 'medicos' && 'Gerenciar Médicos'}
            {activeTab === 'pacientes' && 'Pacientes'}
          </h1>
        </div>

        {activeTab === 'dashboard' && (
          <div className="dashboard-content">
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Total de Usuários</h3>
                  <p className="stat-number">{stats.totalUsuarios}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🩺</div>
                <div className="stat-info">
                  <h3>Total de Médicos</h3>
                  <p className="stat-number">{stats.totalMedicos}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏥</div>
                <div className="stat-info">
                  <h3>Total de Pacientes</h3>
                  <p className="stat-number">{stats.totalPacientes}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>Usuários Ativos</h3>
                  <p className="stat-number">{stats.usuariosAtivos}</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Ações Rápidas</h3>
              <div className="action-buttons">
                <button className="action-btn primary" onClick={() => abrirModal('usuario')}>
                  ➕ Novo Usuário
                </button>
                <button className="action-btn secondary" onClick={() => abrirModal('medico')}>
                  👨‍⚕️ Novo Médico
                </button>
                <button onClick={() => navigate('/admin/estatisticas')} className="action-btn tertiary">
                  📊 Ver Estatísticas
                </button>
                <button onClick={carregarDados} className="action-btn quaternary">
                  🔄 Atualizar Dados
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Atividade Recente</h3>
              <div className="activity-list">
                {usuarios.slice(0, 5).map((usuario, index) => (
                  <div key={index} className="activity-item">
                    <div className="activity-icon">👤</div>
                    <div className="activity-info">
                      <p><strong>{usuario.nome || 'Usuário'}</strong> se cadastrou</p>
                      <small>{usuario.dataCadastro ? new Date(usuario.dataCadastro).toLocaleDateString('pt-BR') : 'Data não disponível'}</small>
                    </div>
                  </div>
                ))}
                {usuarios.length === 0 && (
                  <div className="activity-item">
                    <div className="activity-icon">📝</div>
                    <div className="activity-info">
                      <p>Nenhuma atividade recente</p>
                      <small>Sistema inicializado</small>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gerenciar Usuários</h2>
              <button className="btn-primary" onClick={() => abrirModal('usuario')}>➕ Novo Usuário</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th>Data Cadastro</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {usuarios.length > 0 ? usuarios.map((usuario, index) => (
                    <tr key={index}>
                      <td>{usuario.nome || 'N/A'}</td>
                      <td>{usuario.email || 'N/A'}</td>
                      <td>{usuario.tipo || 'usuario'}</td>
                      <td>
                        <span className={`status-badge ${usuario.status === 'ativo' ? 'active' : 'inactive'}`}>
                          {usuario.status || 'ativo'}
                        </span>
                      </td>
                      <td>{usuario.dataCadastro ? new Date(usuario.dataCadastro).toLocaleDateString('pt-BR') : 'N/A'}</td>
                      <td>
                        <button className="btn-edit" title="Editar">✏️</button>
                        <button className="btn-delete" onClick={() => excluirUsuario(index)} title="Excluir">🗑️</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>
                        Nenhum usuário cadastrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'medicos' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gerenciar Médicos</h2>
              <button className="btn-primary" onClick={() => abrirModal('medico')}>👨‍⚕️ Novo Médico</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>CRM</th>
                    <th>Especialidade</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {medicos.length > 0 ? medicos.map((medico, index) => (
                    <tr key={index}>
                      <td>{medico.nome || 'N/A'}</td>
                      <td>{medico.crm || 'N/A'}</td>
                      <td>{medico.especialidade || 'N/A'}</td>
                      <td>{medico.email || 'N/A'}</td>
                      <td>
                        <span className={`status-badge ${medico.status === 'ativo' ? 'active' : 'inactive'}`}>
                          {medico.status || 'ativo'}
                        </span>
                      </td>
                      <td>
                        <button className="btn-edit" title="Editar">✏️</button>
                        <button className="btn-delete" onClick={() => excluirMedico(index)} title="Excluir">🗑️</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" style={{textAlign: 'center', padding: '20px'}}>
                        Nenhum médico cadastrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'pacientes' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Pacientes</h2>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Status</th>
                    <th>Última Consulta</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientes.length > 0 ? pacientes.map((paciente, index) => (
                    <tr key={index}>
                      <td>{paciente.nomeCompleto || paciente.nome || 'N/A'}</td>
                      <td>{paciente.idade || 'N/A'}</td>
                      <td>
                        <span className="status-badge warning">
                          {paciente.status || 'Em acompanhamento'}
                        </span>
                      </td>
                      <td>{paciente.dataCadastro ? new Date(paciente.dataCadastro).toLocaleDateString('pt-BR') : 'N/A'}</td>
                      <td>
                        <button 
                          className="btn-view" 
                          onClick={() => navigate(`/admin/paciente/${index}`)}
                        >
                          👁️
                        </button>
                        <button 
                          className="btn-chat"
                          onClick={() => navigate(`/admin/chat/${index}`)}
                        >
                          💬
                        </button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="5" style={{textAlign: 'center', padding: '20px'}}>
                        Nenhum paciente cadastrado
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal para cadastro/edição */}
      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>
                {tipoModal === 'usuario' ? 
                  (itemEditando ? 'Editar Usuário' : 'Novo Usuário') : 
                  (itemEditando ? 'Editar Médico' : 'Novo Médico')
                }
              </h3>
              <button onClick={fecharModal} className="modal-close">×</button>
            </div>
            
            <div className="modal-body">
              {tipoModal === 'usuario' ? (
                <div className="form-group">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    value={novoUsuario.nome}
                    onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                    placeholder="Digite o nome completo"
                  />
                  
                  <label>Email *</label>
                  <input
                    type="email"
                    value={novoUsuario.email}
                    onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
                    placeholder="Digite o email"
                  />
                  
                  <label>Senha *</label>
                  <input
                    type="password"
                    value={novoUsuario.senha}
                    onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})}
                    placeholder="Digite a senha"
                  />
                  
                  <label>Tipo de Usuário</label>
                  <select
                    value={novoUsuario.tipo}
                    onChange={(e) => setNovoUsuario({...novoUsuario, tipo: e.target.value})}
                  >
                    <option value="usuario">Usuário</option>
                    <option value="medico">Médico</option>
                    <option value="admin">Administrador</option>
                  </select>
                  
                  <label>Status</label>
                  <select
                    value={novoUsuario.status}
                    onChange={(e) => setNovoUsuario({...novoUsuario, status: e.target.value})}
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
              ) : (
                <div className="form-group">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    value={novoMedico.nome}
                    onChange={(e) => setNovoMedico({...novoMedico, nome: e.target.value})}
                    placeholder="Digite o nome completo"
                  />
                  
                  <label>Email *</label>
                  <input
                    type="email"
                    value={novoMedico.email}
                    onChange={(e) => setNovoMedico({...novoMedico, email: e.target.value})}
                    placeholder="Digite o email"
                  />
                  
                  <label>CRM *</label>
                  <input
                    type="text"
                    value={novoMedico.crm}
                    onChange={(e) => setNovoMedico({...novoMedico, crm: e.target.value})}
                    placeholder="123456/SP"
                  />
                  
                  <label>Especialidade</label>
                  <select
                    value={novoMedico.especialidade}
                    onChange={(e) => setNovoMedico({...novoMedico, especialidade: e.target.value})}
                  >
                    <option value="">Selecione a especialidade</option>
                    <option value="Cardiologia">Cardiologia</option>
                    <option value="Dermatologia">Dermatologia</option>
                    <option value="Endocrinologia">Endocrinologia</option>
                    <option value="Ginecologia">Ginecologia</option>
                    <option value="Neurologia">Neurologia</option>
                    <option value="Oftalmologia">Oftalmologia</option>
                    <option value="Ortopedia">Ortopedia</option>
                    <option value="Pediatria">Pediatria</option>
                    <option value="Psiquiatria">Psiquiatria</option>
                    <option value="Urologia">Urologia</option>
                    <option value="Clínica Geral">Clínica Geral</option>
                  </select>
                  
                  <label>Telefone</label>
                  <input
                    type="tel"
                    value={novoMedico.telefone}
                    onChange={(e) => setNovoMedico({...novoMedico, telefone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                  
                  <label>Status</label>
                  <select
                    value={novoMedico.status}
                    onChange={(e) => setNovoMedico({...novoMedico, status: e.target.value})}
                  >
                    <option value="ativo">Ativo</option>
                    <option value="inativo">Inativo</option>
                  </select>
                </div>
              )}
            </div>
            
            <div className="modal-footer">
              <button onClick={fecharModal} className="btn-cancel">
                Cancelar
              </button>
              <button 
                onClick={tipoModal === 'usuario' ? salvarUsuario : salvarMedico} 
                className="btn-save"
              >
                {itemEditando ? 'Salvar Alterações' : 'Cadastrar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
