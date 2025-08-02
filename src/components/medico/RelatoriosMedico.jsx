import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComponenteSimples.css';

export default function RelatoriosMedico() {
  const navigate = useNavigate();

  return (
    <div className="componente-simples-container">
      <div className="header">
        <button onClick={() => navigate('/menu')} className="back-btn">
          ← Voltar
        </button>
        <h1>📊 Relatórios Médicos</h1>
      </div>

      <div className="content-card">
        <div className="icon-section">
          <span className="main-icon">📊</span>
        </div>
        
        <h2>Central de Relatórios</h2>
        <p>Gere relatórios detalhados de pacientes e estatísticas de sua prática médica.</p>
        
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Relatórios de evolução do paciente</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Estatísticas de consultas</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Relatórios de prescrições</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Análise de eficácia de tratamentos</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Exportação em múltiplos formatos</span>
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
          <button onClick={() => navigate('/relatorio')} className="primary-btn">
            Relatório Geral
          </button>
          <button onClick={() => navigate('/menu')} className="secondary-btn">
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
