import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComponenteSimples.css';

export default function ExamesMedico() {
  const navigate = useNavigate();

  return (
    <div className="componente-simples-container">
      <div className="header">
        <button onClick={() => navigate('/menu')} className="back-btn">
          ← Voltar
        </button>
        <h1>🔬 Análise de Exames</h1>
      </div>

      <div className="content-card">
        <div className="icon-section">
          <span className="main-icon">🔬</span>
        </div>
        
        <h2>Central de Exames</h2>
        <p>Revise e analise exames médicos dos pacientes com ferramentas avançadas de visualização.</p>
        
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Visualizador de imagens médicas</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Análise de exames laboratoriais</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Comparação temporal de resultados</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Geração de relatórios automáticos</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Integração com laboratórios</span>
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
          <button onClick={() => navigate('/exames')} className="primary-btn">
            Upload de Exames
          </button>
          <button onClick={() => navigate('/menu')} className="secondary-btn">
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
