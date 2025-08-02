import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PacientesMedico.css';

export default function PacientesMedico() {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  useEffect(() => {
    carregarPacientes();
  }, []);

  const carregarPacientes = () => {
    // Carregar pacientes do localStorage
    const pacientesData = JSON.parse(localStorage.getItem('pacientes')) || [];
    
    // Se não há dados, criar dados de exemplo
    if (pacientesData.length === 0) {
      const pacientesExemplo = [
        {
          id: 1,
          nome: 'Maria Silva',
          idade: 45,
          genero: 'Feminino',
          email: 'maria.silva@email.com',
          telefone: '(11) 99999-1111',
          ultimaConsulta: '2025-01-10',
          proximaConsulta: '2025-02-15',
          status: 'Em tratamento',
          condicoes: ['Hipertensão', 'Diabetes'],
          medicamentos: ['Losartana 50mg', 'Metformina 850mg'],
          observacoes: 'Paciente com boa adesão ao tratamento.'
        },
        {
          id: 2,
          nome: 'João Santos',
          idade: 38,
          genero: 'Masculino',
          email: 'joao.santos@email.com',
          telefone: '(11) 98888-2222',
          ultimaConsulta: '2025-01-08',
          proximaConsulta: '2025-01-22',
          status: 'Acompanhamento',
          condicoes: ['Ansiedade'],
          medicamentos: ['Alprazolam 0,5mg'],
          observacoes: 'Paciente em acompanhamento psicológico.'
        },
        {
          id: 3,
          nome: 'Ana Costa',
          idade: 52,
          genero: 'Feminino',
          email: 'ana.costa@email.com',
          telefone: '(11) 97777-3333',
          ultimaConsulta: '2025-01-05',
          proximaConsulta: '2025-01-25',
          status: 'Recuperação',
          condicoes: ['Pós-cirúrgico'],
          medicamentos: ['Dipirona 500mg', 'Omeprazol 20mg'],
          observacoes: 'Recuperação pós-cirúrgica em andamento.'
        }
      ];
      localStorage.setItem('pacientes', JSON.stringify(pacientesExemplo));
      setPacientes(pacientesExemplo);
    } else {
      // Garantir que todos os pacientes tenham um status válido
      const pacientesValidados = pacientesData.map(paciente => ({
        ...paciente,
        status: paciente.status || 'Acompanhamento',
        condicoes: paciente.condicoes || [],
        medicamentos: paciente.medicamentos || [],
        observacoes: paciente.observacoes || ''
      }));
      setPacientes(pacientesValidados);
    }
  };

  const filtrarPacientes = () => {
    if (!filtro) return pacientes;
    
    return pacientes.filter(paciente => 
      paciente.nome.toLowerCase().includes(filtro.toLowerCase()) ||
      paciente.email.toLowerCase().includes(filtro.toLowerCase()) ||
      paciente.status.toLowerCase().includes(filtro.toLowerCase()) ||
      paciente.condicoes.some(condicao => 
        condicao.toLowerCase().includes(filtro.toLowerCase())
      )
    );
  };

  const getStatusColor = (status) => {
    if (!status) return '#757575';
    
    switch(status.toLowerCase()) {
      case 'em tratamento': return '#f44336';
      case 'acompanhamento': return '#FF9800';
      case 'recuperação': return '#2196F3';
      case 'alta': return '#4CAF50';
      default: return '#757575';
    }
  };

  const adicionarObservacao = (pacienteId, novaObservacao) => {
    const pacientesAtualizados = pacientes.map(p => 
      p.id === pacienteId 
        ? { ...p, observacoes: novaObservacao }
        : p
    );
    setPacientes(pacientesAtualizados);
    localStorage.setItem('pacientes', JSON.stringify(pacientesAtualizados));
  };

  const atualizarStatus = (pacienteId, novoStatus) => {
    const pacientesAtualizados = pacientes.map(p => 
      p.id === pacienteId 
        ? { ...p, status: novoStatus }
        : p
    );
    setPacientes(pacientesAtualizados);
    localStorage.setItem('pacientes', JSON.stringify(pacientesAtualizados));
    setPacienteSelecionado(prev => prev ? { ...prev, status: novoStatus } : prev);
  };

  return (
    <div className="pacientes-medico-container">
      <div className="header">
        <button onClick={() => navigate('/menu')} className="back-btn">
          ← Voltar
        </button>
        <h1>👥 Meus Pacientes</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Buscar pacientes por nome, email, status ou condição..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
      </div>

      <div className="pacientes-stats">
        <div className="stat-card">
          <span className="stat-number">{pacientes.length}</span>
          <span className="stat-label">Total de Pacientes</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {pacientes.filter(p => p.status === 'Em tratamento').length}
          </span>
          <span className="stat-label">Em Tratamento</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {pacientes.filter(p => p.status === 'Acompanhamento').length}
          </span>
          <span className="stat-label">Em Acompanhamento</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">
            {pacientes.filter(p => p.status === 'Recuperação').length}
          </span>
          <span className="stat-label">Em Recuperação</span>
        </div>
      </div>

      <div className="pacientes-list">
        {filtrarPacientes().map(paciente => (
          <div key={paciente.id} className="paciente-card">
            <div className="paciente-info">
              <div className="paciente-header">
                <h3>{paciente.nome}</h3>
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(paciente.status) }}
                >
                  {paciente.status}
                </span>
              </div>
              <div className="paciente-details">
                <p>👤 {paciente.idade} anos - {paciente.genero}</p>
                <p>📧 {paciente.email}</p>
                <p>📱 {paciente.telefone}</p>
                <p>📅 Última consulta: {new Date(paciente.ultimaConsulta).toLocaleDateString('pt-BR')}</p>
                <p>🔄 Próxima consulta: {new Date(paciente.proximaConsulta).toLocaleDateString('pt-BR')}</p>
              </div>
              <div className="condicoes">
                <strong>Condições:</strong>
                {(paciente.condicoes || []).map((condicao, index) => (
                  <span key={index} className="condicao-tag">
                    {condicao}
                  </span>
                ))}
              </div>
            </div>
            <div className="paciente-actions">
              <button 
                onClick={() => {
                  setPacienteSelecionado(paciente);
                  setShowModal(true);
                }}
              >
                Ver Prontuário
              </button>
              <button onClick={() => navigate(`/medico/prescricao/${paciente.id}`)}>
                Nova Prescrição
              </button>
              <button onClick={() => navigate(`/chat/${paciente.id}`)}>
                Chat
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtrarPacientes().length === 0 && (
        <div className="empty-state">
          <p>👤 Nenhum paciente encontrado.</p>
        </div>
      )}

      {showModal && pacienteSelecionado && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>📋 Prontuário - {pacienteSelecionado.nome}</h2>
            
            <div className="prontuario-section">
              <h3>Dados Pessoais</h3>
              <div className="info-grid">
                <p><strong>Nome:</strong> {pacienteSelecionado.nome}</p>
                <p><strong>Idade:</strong> {pacienteSelecionado.idade} anos</p>
                <p><strong>Gênero:</strong> {pacienteSelecionado.genero}</p>
                <p><strong>Email:</strong> {pacienteSelecionado.email}</p>
                <p><strong>Telefone:</strong> {pacienteSelecionado.telefone}</p>
              </div>
            </div>

            <div className="prontuario-section">
              <h3>Status e Datas</h3>
              <div className="status-section">
                <p><strong>Status Atual:</strong> 
                  <span 
                    className="status-inline"
                    style={{ backgroundColor: getStatusColor(pacienteSelecionado.status) }}
                  >
                    {pacienteSelecionado.status}
                  </span>
                </p>
                <p><strong>Última Consulta:</strong> {new Date(pacienteSelecionado.ultimaConsulta).toLocaleDateString('pt-BR')}</p>
                <p><strong>Próxima Consulta:</strong> {new Date(pacienteSelecionado.proximaConsulta).toLocaleDateString('pt-BR')}</p>
              </div>
              
              <div className="status-update">
                <label>Atualizar Status:</label>
                <select 
                  value={pacienteSelecionado.status}
                  onChange={(e) => atualizarStatus(pacienteSelecionado.id, e.target.value)}
                >
                  <option value="Em tratamento">Em tratamento</option>
                  <option value="Acompanhamento">Acompanhamento</option>
                  <option value="Recuperação">Recuperação</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
            </div>

            <div className="prontuario-section">
              <h3>Condições Médicas</h3>
              <div className="condicoes-list">
                {(pacienteSelecionado.condicoes || []).map((condicao, index) => (
                  <span key={index} className="condicao-tag">
                    {condicao}
                  </span>
                ))}
              </div>
            </div>

            <div className="prontuario-section">
              <h3>Medicamentos Atuais</h3>
              <div className="medicamentos-list">
                {(pacienteSelecionado.medicamentos || []).map((medicamento, index) => (
                  <div key={index} className="medicamento-item">
                    💊 {medicamento}
                  </div>
                ))}
              </div>
            </div>

            <div className="prontuario-section">
              <h3>Observações</h3>
              <textarea
                value={pacienteSelecionado.observacoes}
                onChange={(e) => {
                  setPacienteSelecionado(prev => ({
                    ...prev,
                    observacoes: e.target.value
                  }));
                }}
                placeholder="Adicione observações sobre o paciente..."
                rows="4"
              />
              <button 
                className="save-btn"
                onClick={() => {
                  adicionarObservacao(pacienteSelecionado.id, pacienteSelecionado.observacoes);
                  // TODO: Adicionar feedback visual (Snackbar) para observações salvas
                }}
              >
                Salvar Observações
              </button>
            </div>

            <div className="modal-actions">
              <button onClick={() => setShowModal(false)}>Fechar</button>
              <button onClick={() => navigate(`/medico/prescricao/${pacienteSelecionado.id}`)}>
                Nova Prescrição
              </button>
              <button onClick={() => navigate(`/chat/${pacienteSelecionado.id}`)}>
                Abrir Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
