import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    if (!sessionStorage.getItem('admin')) {
      navigate('/admin');
      return;
    }
  }, [navigate]);

  const logout = () => {
    sessionStorage.removeItem('admin');
    navigate('/admin');
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
                  <p className="stat-number">12</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🩺</div>
                <div className="stat-info">
                  <h3>Total de Médicos</h3>
                  <p className="stat-number">8</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">🏥</div>
                <div className="stat-info">
                  <h3>Total de Pacientes</h3>
                  <p className="stat-number">45</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-info">
                  <h3>Usuários Ativos</h3>
                  <p className="stat-number">9</p>
                </div>
              </div>
            </div>

            <div className="quick-actions">
              <h3>Ações Rápidas</h3>
              <div className="action-buttons">
                <button className="action-btn primary">
                  ➕ Novo Usuário
                </button>
                <button className="action-btn secondary">
                  👨‍⚕️ Novo Médico
                </button>
                <button onClick={() => navigate('/admin/estatisticas')} className="action-btn tertiary">
                  📊 Ver Estatísticas
                </button>
                <button className="action-btn quaternary">
                  🔄 Atualizar Dados
                </button>
              </div>
            </div>

            <div className="recent-activity">
              <h3>Atividade Recente</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">👤</div>
                  <div className="activity-info">
                    <p><strong>João Silva</strong> se cadastrou</p>
                    <small>Hoje às 14:30</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📋</div>
                  <div className="activity-info">
                    <p><strong>Maria Santos</strong> enviou anamnese</p>
                    <small>Hoje às 13:15</small>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon">📅</div>
                  <div className="activity-info">
                    <p><strong>Pedro Costa</strong> agendou consulta</p>
                    <small>Hoje às 12:00</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'usuarios' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gerenciar Usuários</h2>
              <button className="btn-primary">➕ Novo Usuário</button>
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
                  <tr>
                    <td>João Silva</td>
                    <td>joao@email.com</td>
                    <td>Usuário</td>
                    <td><span className="status-badge active">Ativo</span></td>
                    <td>15/07/2025</td>
                    <td>
                      <button className="btn-edit">✏️</button>
                      <button className="btn-delete">🗑️</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'medicos' && (
          <div className="content-section">
            <div className="section-header">
              <h2>Gerenciar Médicos</h2>
              <button className="btn-primary">👨‍⚕️ Novo Médico</button>
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
                  <tr>
                    <td>Dr. Carlos Mendes</td>
                    <td>123456/SP</td>
                    <td>Cardiologia</td>
                    <td>carlos@clinica.com</td>
                    <td><span className="status-badge active">Ativo</span></td>
                    <td>
                      <button className="btn-edit">✏️</button>
                      <button className="btn-delete">🗑️</button>
                    </td>
                  </tr>
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
                  <tr>
                    <td>Maria Santos</td>
                    <td>45 anos</td>
                    <td><span className="status-badge warning">Em tratamento</span></td>
                    <td>10/07/2025</td>
                    <td>
                      <button className="btn-view">👁️</button>
                      <button className="btn-chat">💬</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
