import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComponenteSimples.css';

export default function Prescricoes() {
  const navigate = useNavigate();

  return (
    <div className="componente-simples-container">
      <div className="header">
        <button onClick={() => navigate('/menu')} className="back-btn">
          ← Voltar
        </button>
        <h1>📝 Prescrições Médicas</h1>
      </div>

      <div className="content-card">
        <div className="icon-section">
          <span className="main-icon">📝</span>
        </div>
        
        <h2>Sistema de Prescrições</h2>
        <p>Esta funcionalidade permite criar, gerenciar e acompanhar prescrições médicas de forma digital e segura.</p>
        
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Criação de prescrições digitais</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Banco de medicamentos atualizado</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Histórico de prescrições por paciente</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Assinatura digital</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Integração com farmácias</span>
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
