import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/medico/ComponenteSimples.css';

export default function AdminCadastros() {
  const navigate = useNavigate();

  return (
    <div className="componente-simples-container">
      <div className="header">
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          ← Voltar
        </button>
        <h1>👥 Cadastros</h1>
      </div>

      <div className="content-card">
        <div className="icon-section">
          <span className="main-icon">👥</span>
        </div>
        
        <h2>Central de Cadastros</h2>
        <p>Gerencie todos os cadastros da plataforma: usuários, médicos e pacientes.</p>
        
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Cadastro de novos usuários</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Registro de médicos especialistas</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Gerenciamento de pacientes</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Validação de dados</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">✅</span>
            <span>Relatórios de cadastros</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🧴</span>
            <span>Gerenciamento de fornecedores de suplementos</span>
          </div>
        </div>

        <div className="status-banner">
          <span className="status-icon">✅</span>
          <div className="status-text">
            <strong>Funcionalidade Disponível</strong>
            <p>Use o Dashboard Administrativo para acessar todas as funcionalidades de cadastro.</p>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={() => navigate('/admin/dashboard')} className="primary-btn">
            Dashboard Admin
          </button>
          <button onClick={() => navigate('/admin-fornecedor')} className="primary-btn">
            Fornecedores
          </button>
          <button onClick={() => navigate('/admin')} className="secondary-btn">
            Voltar ao Login
          </button>
        </div>
      </div>
    </div>
  );
}
