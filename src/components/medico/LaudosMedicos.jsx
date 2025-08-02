import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComponenteSimples.css';

export default function LaudosMedicos() {
  const navigate = useNavigate();

  return (
    <div className="componente-simples-container">
      <div className="header">
        <button onClick={() => navigate('/menu')} className="back-btn">
          ← Voltar
        </button>
        <h1>📋 Laudos Médicos</h1>
      </div>

      <div className="content-card">
        <div className="icon-section">
          <span className="main-icon">📋</span>
        </div>
        
        <h2>Sistema de Laudos</h2>
        <p>Elabore laudos médicos profissionais com modelos padronizados e assinatura digital.</p>
        
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Modelos de laudos especializados</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Editor de texto avançado</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Integração com exames</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Assinatura digital certificada</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Histórico de laudos</span>
          </div>
        </div>

        <div className="status-banner">
          <span className="status-icon">🚧</span>
          <div className="status-text">
            <strong>Em Desenvolvimento</strong>
            <p>Esta funcionalidade está sendo desenvolvida e estará disponível em breve.</p>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/medico/pacientes')} className="primary-btn">
            Ver Pacientes
          </button>
          <button onClick={() => navigate('/menu')} className="secondary-btn">
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
