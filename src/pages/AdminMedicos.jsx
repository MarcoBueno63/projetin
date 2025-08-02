import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/medico/ComponenteSimples.css';

export default function AdminMedicos() {
  const navigate = useNavigate();

  return (
    <div className="componente-simples-container">
      <div className="header">
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          ← Voltar
        </button>
        <h1>👨‍⚕️ Gerenciar Médicos</h1>
      </div>

      <div className="content-card">
        <div className="icon-section">
          <span className="main-icon">👨‍⚕️</span>
        </div>
        
        <h2>Sistema de Médicos</h2>
        <p>Cadastre e gerencie médicos da plataforma com especialidades e horários.</p>
        
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Cadastro de médicos especialistas</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Gerenciamento de especialidades</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Controle de agenda</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Validação de credenciais</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Relatórios de desempenho</span>
          </div>
        </div>

        <div className="status-banner">
          <span className="status-icon">✅</span>
          <div className="status-text">
            <strong>Funcionalidade Disponível</strong>
            <p>Use o Dashboard Administrativo para gerenciar médicos e especialidades.</p>
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
