import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TestePermissoes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Limpar localStorage primeiro
    localStorage.clear();
    
    // Criar usuário admin de teste com todas as permissões
    const usuarioAdmin = {
      nome: 'Admin Teste',
      email: 'admin@teste.com',
      tipo: 'admin',
      loggedIn: true,
      permissoes: ['admin', 'medico', 'usuario', 'cadastros', 'relatorios', 'estatisticas', 'todos']
    };

    // Salvar no localStorage
    localStorage.setItem('usuario', JSON.stringify(usuarioAdmin));
    
    
    // Redirecionar para o menu principal após 1 segundo
    setTimeout(() => {
      navigate('/menu-principal');
    }, 1000);
  }, [navigate]);

  const criarUsuarioMedico = () => {
    localStorage.clear();
    
    const usuarioMedico = {
      nome: 'Dr. Médico Teste',
      email: 'medico@teste.com',
      tipo: 'medico',
      loggedIn: true,
      permissoes: ['medico', 'usuario', 'consultas', 'pacientes', 'prescricoes', 'exames']
    };

    localStorage.setItem('usuario', JSON.stringify(usuarioMedico));
    
    setTimeout(() => {
      navigate('/menu-principal');
    }, 500);
  };

  const criarUsuarioComum = () => {
    localStorage.clear();
    
    const usuarioComum = {
      nome: 'Usuário Teste',
      email: 'usuario@teste.com',
      tipo: 'usuario',
      loggedIn: true,
      permissoes: ['usuario']
    };

    localStorage.setItem('usuario', JSON.stringify(usuarioComum));
    
    setTimeout(() => {
      navigate('/menu-principal');
    }, 500);
  };

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '600px', 
      margin: '50px auto',
      backgroundColor: '#f5f5f5',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#2196F3', textAlign: 'center', marginBottom: '30px' }}>
        🧪 Teste de Permissões - Sistema de Saúde
      </h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '5px' }}>
        <p><strong>Criando usuário ADMIN automaticamente...</strong></p>
        <p>Permissões: admin, medico, usuario, cadastros, relatorios, estatisticas, todos</p>
        <p style={{ color: '#4CAF50' }}>✅ Este usuário deve ver TODAS as abas (Principal, Médico, Admin)</p>
      </div>

      <div style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        <button 
          onClick={criarUsuarioMedico}
          style={{
            padding: '15px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🩺 Testar como MÉDICO
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            Ver abas: Principal + Médico (sem Admin)
          </div>
        </button>

        <button 
          onClick={criarUsuarioComum}
          style={{
            padding: '15px',
            backgroundColor: '#FF9800',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          👤 Testar como USUÁRIO COMUM
          <div style={{ fontSize: '12px', marginTop: '5px' }}>
            Ver apenas aba: Principal
          </div>
        </button>

        <button 
          onClick={() => navigate('/login-simples')}
          style={{
            padding: '15px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          🔙 Voltar ao Login
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '15px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <h4 style={{ color: '#1976d2' }}>ℹ️ Como testar:</h4>
        <ol style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>Esta página cria automaticamente um usuário ADMIN</li>
          <li>Você será redirecionado para o Menu Principal</li>
          <li>Verifique se aparecem 3 abas: Principal, Médico, Admin</li>
          <li>Use os botões acima para testar outros tipos de usuário</li>
          <li>Abra o Console (F12) para ver os logs de debug</li>
        </ol>
      </div>
    </div>
  );
};

export default TestePermissoes;
