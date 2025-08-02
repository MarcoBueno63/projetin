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
    apresentacao: '',
    qualificacoes: '',
    credenciais: '',
    chamada: '',
    curriculoNome: '',
    status: 'ativo'
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [tipoModal, setTipoModal] = useState('');
  const [itemEditando, setItemEditando] = useState(null);

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

  const salvarUsuario = () => {
    if (!novoUsuario.nome || !novoUsuario.email) return;

    const usuariosAtualizados = itemEditando
      ? usuarios.map(u => u.id === itemEditando.id ? { ...novoUsuario, id: itemEditando.id } : u)
      : [...usuarios, { ...novoUsuario, id: Date.now(), dataCadastro: new Date().toISOString() }];

    setUsuarios(usuariosAtualizados);
    localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
    
    setNovoUsuario({ nome: '', email: '', senha: '', tipo: 'usuario', status: 'ativo' });
    setModalAberto(false);
    setItemEditando(null);
    carregarDados();
  };

  const salvarMedico = () => {
    if (!novoMedico.nome || !novoMedico.email || !novoMedico.crm) return;

    const medicosAtualizados = itemEditando
      ? medicos.map(m => m.id === itemEditando.id ? { ...novoMedico, id: itemEditando.id } : m)
      : [...medicos, { ...novoMedico, id: Date.now(), dataCadastro: new Date().toISOString() }];

    setMedicos(medicosAtualizados);
    localStorage.setItem('medicos', JSON.stringify(medicosAtualizados));
    
    setNovoMedico({ nome: '', email: '', crm: '', especialidade: '', telefone: '', status: 'ativo' });
    setModalAberto(false);
    setItemEditando(null);
    carregarDados();
  };

  const editarItem = (item, tipo) => {
    setItemEditando(item);
    setTipoModal(tipo);
    if (tipo === 'usuario') {
      setNovoUsuario(item);
    } else if (tipo === 'medico') {
      setNovoMedico(item);
    }
    setModalAberto(true);
  };

  const excluirItem = (id, tipo) => {
    if (!window.confirm('Tem certeza que deseja excluir este item?')) return;

    if (tipo === 'usuario') {
      const usuariosAtualizados = usuarios.filter(u => u.id !== id);
      setUsuarios(usuariosAtualizados);
      localStorage.setItem('usuarios', JSON.stringify(usuariosAtualizados));
    } else if (tipo === 'medico') {
      const medicosAtualizados = medicos.filter(m => m.id !== id);
      setMedicos(medicosAtualizados);
      localStorage.setItem('medicos', JSON.stringify(medicosAtualizados));
    }
    carregarDados();
  };

  const abrirModal = (tipo) => {
    setTipoModal(tipo);
    setItemEditando(null);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
    setItemEditando(null);
    setNovoUsuario({ nome: '', email: '', senha: '', tipo: 'usuario', status: 'ativo' });
    setNovoMedico({ nome: '', email: '', crm: '', especialidade: '', telefone: '', apresentacao: '', qualificacoes: '', credenciais: '', chamada: '', curriculoNome: '', status: 'ativo' });
  };

  const logout = () => {
    sessionStorage.removeItem('admin');
    navigate('/admin');
  };

  const renderDashboard = () => (
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
          <button onClick={() => abrirModal('usuario')} className="action-btn primary">
            ➕ Novo Usuário
          </button>
          <button onClick={() => abrirModal('medico')} className="action-btn secondary">
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
          {usuarios.slice(0, 5).map(usuario => (
            <div key={usuario.id} className="activity-item">
              <div className="activity-icon">👤</div>
              <div className="activity-info">
                <p><strong>{usuario.nome}</strong> se cadastrou</p>
                <small>{new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderUsuarios = () => (
    <div className="usuarios-content">
      <div className="content-header">
        <h3>Gerenciar Usuários</h3>
        <button onClick={() => abrirModal('usuario')} className="btn-primary">
          ➕ Novo Usuário
        </button>
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
            {usuarios.map(usuario => (
              <tr key={usuario.id}>
                <td>{usuario.nome}</td>
                <td>{usuario.email}</td>
                <td>
                  <span className={`badge ${usuario.tipo}`}>
                    {usuario.tipo}
                  </span>
                </td>
                <td>
                  <span className={`status ${usuario.status}`}>
                    {usuario.status}
                  </span>
                </td>
                <td>{new Date(usuario.dataCadastro).toLocaleDateString('pt-BR')}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => editarItem(usuario, 'usuario')} className="btn-edit">
                      ✏️
                    </button>
                    <button onClick={() => excluirItem(usuario.id, 'usuario')} className="btn-delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderMedicos = () => (
    <div className="medicos-content">
      <div className="content-header">
        <h3>Gerenciar Médicos</h3>
        <button onClick={() => abrirModal('medico')} className="btn-primary">
          👨‍⚕️ Novo Médico
        </button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>CRM</th>
              <th>Especialidade</th>
              <th>Telefone</th>
              <th>Apresentação</th>
              <th>Qualificações</th>
              <th>Credenciais</th>
              <th>Chamada</th>
              <th>Currículo</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {medicos.map(medico => (
              <tr key={medico.id}>
                <td>{medico.nome}</td>
                <td>{medico.email}</td>
                <td>{medico.crm}</td>
                <td>{medico.especialidade}</td>
                <td>{medico.telefone}</td>
                <td>{medico.apresentacao}</td>
                <td>{medico.qualificacoes}</td>
                <td>{medico.credenciais || '-'}</td>
                <td>{medico.chamada || '-'}</td>
                <td>{medico.curriculoNome ? <a href="#" title="Currículo disponível">📄 {medico.curriculoNome}</a> : '-'}</td>
                <td>
                  <span className={`status ${medico.status}`}>
                    {medico.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => editarItem(medico, 'medico')} className="btn-edit">
                      ✏️
                    </button>
                    <button onClick={() => excluirItem(medico.id, 'medico')} className="btn-delete">
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderPacientes = () => (
    <div className="pacientes-content">
      <div className="content-header">
        <h3>Pacientes Cadastrados</h3>
        <button onClick={() => navigate('/admin/estatisticas')} className="btn-secondary">
          📊 Ver Estatísticas
        </button>
      </div>
      
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Gênero</th>
              <th>Sintomas</th>
              <th>Status</th>
              <th>Data Cadastro</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map(paciente => (
              <tr key={paciente.id}>
                <td>{paciente.nome}</td>
                <td>{paciente.genero}</td>
                <td>{paciente.sintomas}</td>
                <td>
                  <span className={`status ${paciente.status || 'Em acompanhamento'}`}>
                    {paciente.status || 'Em acompanhamento'}
                  </span>
                </td>
                <td>{new Date(paciente.dataCadastro).toLocaleDateString('pt-BR')}</td>
                <td>
                  <div className="action-buttons">
                    <button onClick={() => navigate(`/admin/paciente/${paciente.id}`)} className="btn-view">
                      👁️
                    </button>
                    <button onClick={() => navigate(`/admin/chat/${paciente.id}`)} className="btn-chat">
                      💬
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'usuarios' && 'Gerenciar Usuários'}
            {activeTab === 'medicos' && 'Gerenciar Médicos'}
            {activeTab === 'pacientes' && 'Pacientes'}
          </h1>
        </div>

        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'usuarios' && renderUsuarios()}
        {activeTab === 'medicos' && renderMedicos()}
        {activeTab === 'pacientes' && renderPacientes()}
      </div>

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
                  <label>Nome *</label>
                  <input
                    type="text"
                    value={novoUsuario.nome}
                    onChange={(e) => setNovoUsuario({...novoUsuario, nome: e.target.value})}
                    placeholder="Nome completo"
                  />
                  
                  <label>Email *</label>
                  <input
                    type="email"
                    value={novoUsuario.email}
                    onChange={(e) => setNovoUsuario({...novoUsuario, email: e.target.value})}
                    placeholder="email@exemplo.com"
                  />
                  
                  <label>Senha *</label>
                  <input
                    type="password"
                    value={novoUsuario.senha}
                    onChange={(e) => setNovoUsuario({...novoUsuario, senha: e.target.value})}
                    placeholder="Senha"
                  />
                  
                  <label>Tipo</label>
                  <select
                    value={novoUsuario.tipo}
                    onChange={(e) => setNovoUsuario({...novoUsuario, tipo: e.target.value})}
                  >
                    <option value="usuario">Usuário</option>
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
                  <label>Nome *</label>
                  <input
                    type="text"
                    value={novoMedico.nome}
                    onChange={(e) => setNovoMedico({...novoMedico, nome: e.target.value})}
                    placeholder="Nome completo"
                  />
                  <label>Email *</label>
                  <input
                    type="email"
                    value={novoMedico.email}
                    onChange={(e) => setNovoMedico({...novoMedico, email: e.target.value})}
                    placeholder="email@exemplo.com"
                  />
                  <label>CRM *</label>
                  <input
                    type="text"
                    value={novoMedico.crm}
                    onChange={(e) => setNovoMedico({...novoMedico, crm: e.target.value})}
                    placeholder="123456/SP"
                  />
                  <label>Especialidade</label>
                  <input
                    type="text"
                    value={novoMedico.especialidade}
                    onChange={(e) => setNovoMedico({...novoMedico, especialidade: e.target.value})}
                    placeholder="Cardiologia, Dermatologia, etc."
                  />
                  <label>Telefone</label>
                  <input
                    type="tel"
                    value={novoMedico.telefone}
                    onChange={(e) => setNovoMedico({...novoMedico, telefone: e.target.value})}
                    placeholder="(11) 99999-9999"
                  />
                  <label>Apresentação</label>
                  <textarea
                    value={novoMedico.apresentacao}
                    onChange={(e) => setNovoMedico({...novoMedico, apresentacao: e.target.value})}
                    placeholder="Fale sobre sua experiência, abordagem, etc."
                    rows={2}
                  />
                  <label>Qualificações</label>
                  <textarea
                    value={novoMedico.qualificacoes}
                    onChange={(e) => setNovoMedico({...novoMedico, qualificacoes: e.target.value})}
                    placeholder="Formação, títulos, cursos, certificações, etc."
                    rows={2}
                  />
                <label>Credenciais</label>
                <textarea
                  value={novoMedico.credenciais}
                  onChange={(e) => setNovoMedico({...novoMedico, credenciais: e.target.value})}
                  placeholder="RQE, títulos, sociedades, registros, etc."
                  rows={2}
                />
                <label>Chamada para Clientes</label>
                <input
                  type="text"
                  value={novoMedico.chamada}
                  onChange={(e) => setNovoMedico({...novoMedico, chamada: e.target.value})}
                  placeholder="Ex: Médico humanizado, especialista em..."
                />
                <label>Currículo (nome do arquivo)</label>
                <input
                  type="text"
                  value={novoMedico.curriculoNome}
                  onChange={(e) => setNovoMedico({...novoMedico, curriculoNome: e.target.value})}
                  placeholder="curriculo.pdf"
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
                {itemEditando ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
