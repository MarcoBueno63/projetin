import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/medico/ComponenteSimples.css';

export default function AdminUsuarios() {
  const navigate = useNavigate();

  return (
    <div className="componente-simples-container">
      <div className="header">
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          ← Voltar
        </button>
        <h1>👤 Gerenciar Usuários</h1>
      </div>

      <div className="content-card">
        <div className="icon-section">
          <span className="main-icon">👤</span>
        </div>
        
        <h2>Sistema de Usuários</h2>
        <p>Gerencie todos os usuários da plataforma com controle total de permissões e acesso.</p>
        
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Cadastro e edição de usuários</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Controle de permissões</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Histórico de atividades</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Relatórios de uso</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Backup de dados</span>
          </div>
        </div>

        <div className="status-banner">
          <span className="status-icon">✅</span>
          <div className="status-text">
            <strong>Funcionalidade Disponível</strong>
            <p>Use o Dashboard Administrativo para gerenciar usuários e médicos.</p>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/admin/dashboard')} className="primary-btn">
            Dashboard Admin
          </button>
          <button onClick={() => navigate('/admin')} className="secondary-btn">
            Voltar ao Login
          </button>
        </div>
      </div>
    </div>
  );
}
