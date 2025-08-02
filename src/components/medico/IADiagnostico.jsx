import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComponenteSimples.css';

export default function IADiagnostico() {
  const navigate = useNavigate();

  return (
    <div className="componente-simples-container">
      <div className="header">
        <button onClick={() => navigate('/menu')} className="back-btn">
          ← Voltar
        </button>
        <h1>🤖 IA para Diagnóstico</h1>
      </div>

      <div className="content-card">
        <div className="icon-section">
          <span className="main-icon">🤖</span>
        </div>
        
        <h2>Assistente de IA</h2>
        <p>Utilize inteligência artificial avançada para auxiliar no processo de diagnóstico médico.</p>
        
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Análise de sintomas inteligente</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Sugestões de diagnóstico diferencial</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Análise de padrões em exames</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Recomendações de exames complementares</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Base de conhecimento médico atualizada</span>
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
          <button onClick={() => navigate('/ia-analise')} className="primary-btn">
            IA Análise Geral
          </button>
          <button onClick={() => navigate('/menu')} className="secondary-btn">
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
