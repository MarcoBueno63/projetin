import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ConsultasMedico.css';

export default function ConsultasMedico() {
  const navigate = useNavigate();
  const [consultas, setConsultas] = useState([]);
  const [filtro, setFiltro] = useState('hoje');
  const [showModal, setShowModal] = useState(false);
  const [consultaSelecionada, setConsultaSelecionada] = useState(null);

  useEffect(() => {
    carregarConsultas();
  }, []);

  const carregarConsultas = () => {
    // Carregar consultas do localStorage ou API
    const consultasData = JSON.parse(localStorage.getItem('consultasMedico')) || [];
    
    // Se não há dados, criar dados de exemplo
    if (consultasData.length === 0) {
      const consultasExemplo = [
        {
          id: 1,
          paciente: 'Maria Silva',
          data: new Date().toISOString().split('T')[0],
          horario: '09:00',
          tipo: 'Consulta',
          status: 'Confirmada',
          especialidade: 'Cardiologia'
        },
        {
          id: 2,
          paciente: 'João Santos',
          data: new Date(Date.now() + 86400000).toISOString().split('T')[0],
          horario: '14:30',
          tipo: 'Retorno',
          status: 'Pendente',
          especialidade: 'Cardiologia'
        },
        {
          id: 3,
          paciente: 'Ana Costa',
          data: new Date(Date.now() + 172800000).toISOString().split('T')[0],
          horario: '11:15',
          tipo: 'Primeira consulta',
          status: 'Confirmada',
          especialidade: 'Cardiologia'
        }
      ];
      localStorage.setItem('consultasMedico', JSON.stringify(consultasExemplo));
      setConsultas(consultasExemplo);
    } else {
      setConsultas(consultasData);
    }
  };

  const filtrarConsultas = () => {
    const hoje = new Date().toISOString().split('T')[0];
    const amanha = new Date(Date.now() + 86400000).toISOString().split('T')[0];
    
    switch(filtro) {
      case 'hoje':
        return consultas.filter(c => c.data === hoje);
      case 'amanha':
        return consultas.filter(c => c.data === amanha);
      case 'semana':
        const proximaSemana = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0];
        return consultas.filter(c => c.data >= hoje && c.data <= proximaSemana);
      default:
        return consultas;
    }
  };

  const atualizarStatus = (consultaId, novoStatus) => {
    const consultasAtualizadas = consultas.map(c => 
      c.id === consultaId ? { ...c, status: novoStatus } : c
    );
    setConsultas(consultasAtualizadas);
    localStorage.setItem('consultasMedico', JSON.stringify(consultasAtualizadas));
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Confirmada': return '#4CAF50';
      case 'Pendente': return '#FF9800';
      case 'Cancelada': return '#f44336';
      case 'Concluída': return '#2196F3';
      default: return '#757575';
    }
  };

  return (
    <div className="consultas-medico-container">
      <div className="header">
        <button onClick={() => navigate('/menu')} className="back-btn">
          ← Voltar
        </button>
        <h1>👨‍⚕️ Minhas Consultas</h1>
      </div>

      <div className="filters">
        <button 
          className={filtro === 'hoje' ? 'active' : ''}
          onClick={() => setFiltro('hoje')}
        >
          Hoje
        </button>
        <button 
          className={filtro === 'amanha' ? 'active' : ''}
          onClick={() => setFiltro('amanha')}
        >
          Amanhã
        </button>
        <button 
          className={filtro === 'semana' ? 'active' : ''}
          onClick={() => setFiltro('semana')}
        >
          Esta Semana
        </button>
        <button 
          className={filtro === 'todas' ? 'active' : ''}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
      </div>

      <div className="consultas-list">
        {filtrarConsultas().map(consulta => (
          <div key={consulta.id} className="consulta-card">
            <div className="consulta-info">
              <h3>{consulta.paciente}</h3>
              <p>📅 {new Date(consulta.data).toLocaleDateString('pt-BR')} às {consulta.horario}</p>
              <p>🏥 {consulta.tipo} - {consulta.especialidade}</p>
              <span 
                className="status-badge"
                style={{ backgroundColor: getStatusColor(consulta.status) }}
              >
                {consulta.status}
              </span>
            </div>
            <div className="consulta-actions">
              <button onClick={() => {
                setConsultaSelecionada(consulta);
                setShowModal(true);
              }}>
                Ver Detalhes
              </button>
              {consulta.status === 'Pendente' && (
                <>
                  <button 
                    className="confirm-btn"
                    onClick={() => atualizarStatus(consulta.id, 'Confirmada')}
                  >
                    Confirmar
                  </button>
                  <button 
                    className="cancel-btn"
                    onClick={() => atualizarStatus(consulta.id, 'Cancelada')}
                  >
                    Cancelar
                  </button>
                </>
              )}
              {consulta.status === 'Confirmada' && (
                <button 
                  className="complete-btn"
                  onClick={() => atualizarStatus(consulta.id, 'Concluída')}
                >
                  Concluir
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtrarConsultas().length === 0 && (
        <div className="empty-state">
          <p>📅 Nenhuma consulta encontrada para este período.</p>
        </div>
      )}

      {showModal && consultaSelecionada && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Detalhes da Consulta</h2>
            <div className="consulta-details">
              <p><strong>Paciente:</strong> {consultaSelecionada.paciente}</p>
              <p><strong>Data:</strong> {new Date(consultaSelecionada.data).toLocaleDateString('pt-BR')}</p>
              <p><strong>Horário:</strong> {consultaSelecionada.horario}</p>
              <p><strong>Tipo:</strong> {consultaSelecionada.tipo}</p>
              <p><strong>Especialidade:</strong> {consultaSelecionada.especialidade}</p>
              <p><strong>Status:</strong> {consultaSelecionada.status}</p>
            </div>
            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Fechar</button>
              <button onClick={() => navigate(`/paciente/${consultaSelecionada.id}`)}>
                Ver Prontuário
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
