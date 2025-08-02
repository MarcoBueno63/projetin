import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function LoginSimples() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Determinar tipo de usuário baseado no email para fins de demonstração
    let tipoUsuario = 'usuario';
    let permissoes = ['usuario', 'anamnese', 'exames', 'consultas'];
    
    if (formData.email.includes('admin')) {
      tipoUsuario = 'admin';
      permissoes = ['admin', 'usuario', 'medico', 'cadastros', 'relatorios', 'estatisticas', 'todos'];
    } else if (formData.email.includes('medico') || formData.email.includes('dr')) {
      tipoUsuario = 'medico';
      permissoes = ['medico', 'usuario', 'consultas', 'pacientes', 'prescricoes', 'exames'];
    }
    
    // Login para qualquer usuário (sistema de demonstração)
    const dadosUsuario = {
      email: formData.email,
      nome: formData.email.split('@')[0], // Usar parte do email como nome
      tipo: tipoUsuario,
      permissoes: permissoes,
      loggedIn: true,
      loginTime: new Date().toISOString()
    };
    
    localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
    navigate('/menu');
  };

  const handleDemoLogin = (tipo) => {
    const usuarios = {
      admin: {
        email: 'admin@healthsystem.com',
        nome: 'Administrador',
        tipo: 'admin',
        permissoes: ['admin', 'usuario', 'medico', 'cadastros', 'relatorios', 'estatisticas', 'todos']
      },
      usuario: {
        email: 'usuario@healthsystem.com',
        nome: 'Usuário Comum',
        tipo: 'usuario',
        permissoes: ['usuario', 'anamnese', 'exames', 'consultas']
      },
      medico: {
        email: 'medico@healthsystem.com',
        nome: 'Dr. Médico',
        tipo: 'medico',
        permissoes: ['medico', 'usuario', 'consultas', 'pacientes', 'prescricoes', 'exames']
      }
    };

    const userData = usuarios[tipo];
    localStorage.setItem('usuario', JSON.stringify({
      ...userData,
      loggedIn: true,
      loginTime: new Date().toISOString()
    }));
    navigate('/menu');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>🏥 HealthSystem</h1>
          <p>Sistema de Gestão de Saúde Multi-Usuário</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">E-mail</label>
            <input 
              type="email" 
              id="email"
              name="email"
              placeholder="Digite seu e-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha">Senha</label>
            <input 
              type="password" 
              id="senha"
              name="senha"
              placeholder="Digite sua senha"
              value={formData.senha}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <div className="login-footer">
          <p><strong>✨ Sistema de Gestão de Saúde</strong></p>
          <p>• Anamnese Integrativa Completa</p>
          <p>• Upload e Análise de Exames</p>
          <p>• Interface Moderna e Segura</p>
        </div>
      </div>
    </div>
  );
}
