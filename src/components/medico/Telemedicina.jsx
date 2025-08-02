import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ComponenteSimples.css';

export default function Telemedicina() {
  const navigate = useNavigate();

  return (
    <div className="componente-simples-container">
      <div className="header">
        <button onClick={() => navigate('/menu')} className="back-btn">
          ← Voltar
        </button>
        <h1>💻 Telemedicina</h1>
      </div>

      <div className="content-card">
        <div className="icon-section">
          <span className="main-icon">💻</span>
        </div>
        
        <h2>Plataforma de Telemedicina</h2>
        <p>Realize consultas online e mantenha comunicação direta com seus pacientes.</p>
        
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Videochamadas em alta qualidade</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Chat em tempo real</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Compartilhamento de tela</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Gravação de consultas</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Agendamento integrado</span>
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
          <button onClick={() => navigate('/chat')} className="primary-btn">
            Chat com Profissional
          </button>
          <button onClick={() => navigate('/menu')} className="secondary-btn">
            Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
