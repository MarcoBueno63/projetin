import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Medicamentos.css';

const Medicamentos = () => {
  const navigate = useNavigate();
  const [medicamentos, setMedicamentos] = useState([]);
  const [novoMedicamento, setNovoMedicamento] = useState({
    nome: '',
    dosagem: '',
    frequencia: '',
    horarios: [],
    observacoes: '',
    dataInicio: '',
    dataFim: ''
  });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Carregar medicamentos do localStorage
    const savedMedicamentos = localStorage.getItem('medicamentos');
    if (savedMedicamentos) {
      setMedicamentos(JSON.parse(savedMedicamentos));
    }
  }, []);

  const salvarMedicamentos = (listaMedicamentos) => {
    localStorage.setItem('medicamentos', JSON.stringify(listaMedicamentos));
    setMedicamentos(listaMedicamentos);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingId) {
      // Editar medicamento existente
      const updatedMedicamentos = medicamentos.map(med => 
        med.id === editingId ? { ...novoMedicamento, id: editingId } : med
      );
      salvarMedicamentos(updatedMedicamentos);
      setEditingId(null);
    } else {
      // Adicionar novo medicamento
      const novoMed = {
        ...novoMedicamento,
        id: Date.now(),
        ativo: true,
        dataCriacao: new Date().toISOString()
      };
      salvarMedicamentos([...medicamentos, novoMed]);
    }
    
    resetForm();
    setShowForm(false);
  };

  const resetForm = () => {
    setNovoMedicamento({
      nome: '',
      dosagem: '',
      frequencia: '',
      horarios: [],
      observacoes: '',
      dataInicio: '',
      dataFim: ''
    });
  };

  const editarMedicamento = (medicamento) => {
    setNovoMedicamento(medicamento);
    setEditingId(medicamento.id);
    setShowForm(true);
  };

  const excluirMedicamento = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este medicamento?')) {
      const updatedMedicamentos = medicamentos.filter(med => med.id !== id);
      salvarMedicamentos(updatedMedicamentos);
    }
  };

  const toggleStatus = (id) => {
    const updatedMedicamentos = medicamentos.map(med =>
      med.id === id ? { ...med, ativo: !med.ativo } : med
    );
    salvarMedicamentos(updatedMedicamentos);
  };

  const adicionarHorario = () => {
    const horario = document.getElementById('horario').value;
    if (horario && !novoMedicamento.horarios.includes(horario)) {
      setNovoMedicamento({
        ...novoMedicamento,
        horarios: [...novoMedicamento.horarios, horario]
      });
      document.getElementById('horario').value = '';
    }
  };

  const removerHorario = (horario) => {
    setNovoMedicamento({
      ...novoMedicamento,
      horarios: novoMedicamento.horarios.filter(h => h !== horario)
    });
  };

  const getStatusColor = (medicamento) => {
    if (!medicamento.ativo) return '#999';
    
    const hoje = new Date();
    const dataFim = new Date(medicamento.dataFim);
    
    if (dataFim < hoje) return '#f44336'; // Vencido
    
    const diasRestantes = Math.ceil((dataFim - hoje) / (1000 * 60 * 60 * 24));
    if (diasRestantes <= 7) return '#ff9800'; // Próximo do fim
    
    return '#4caf50'; // Ativo
  };

  return (
    <div className="medicamentos-container">
      <div className="medicamentos-header">
        <button 
          className="btn-voltar" 
          onClick={() => navigate('/menu')}
        >
          ← Voltar ao Menu
        </button>
        <h1>💊 Gerenciamento de Medicamentos</h1>
        <button 
          className="btn-adicionar"
          onClick={() => setShowForm(true)}
        >
          + Adicionar Medicamento
        </button>
      </div>

      {showForm && (
        <div className="form-overlay">
          <div className="form-modal">
            <h2>{editingId ? 'Editar Medicamento' : 'Novo Medicamento'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nome do Medicamento</label>
                <input
                  type="text"
                  value={novoMedicamento.nome}
                  onChange={(e) => setNovoMedicamento({...novoMedicamento, nome: e.target.value})}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Dosagem</label>
                  <input
                    type="text"
                    value={novoMedicamento.dosagem}
                    onChange={(e) => setNovoMedicamento({...novoMedicamento, dosagem: e.target.value})}
                    placeholder="ex: 500mg, 1 comprimido"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Frequência</label>
                  <select
                    value={novoMedicamento.frequencia}
                    onChange={(e) => setNovoMedicamento({...novoMedicamento, frequencia: e.target.value})}
                    required
                  >
                    <option value="">Selecione</option>
                    <option value="1x">1x por dia</option>
                    <option value="2x">2x por dia</option>
                    <option value="3x">3x por dia</option>
                    <option value="4x">4x por dia</option>
                    <option value="semanal">Semanal</option>
                    <option value="conforme">Conforme necessário</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Horários</label>
                <div className="horarios-input">
                  <input
                    type="time"
                    id="horario"
                    placeholder="Adicionar horário"
                  />
                  <button type="button" onClick={adicionarHorario}>+</button>
                </div>
                <div className="horarios-list">
                  {novoMedicamento.horarios.map((horario, index) => (
                    <span key={index} className="horario-tag">
                      {horario}
                      <button type="button" onClick={() => removerHorario(horario)}>×</button>
                    </span>
                  ))}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Data de Início</label>
                  <input
                    type="date"
                    value={novoMedicamento.dataInicio}
                    onChange={(e) => setNovoMedicamento({...novoMedicamento, dataInicio: e.target.value})}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Data de Fim</label>
                  <input
                    type="date"
                    value={novoMedicamento.dataFim}
                    onChange={(e) => setNovoMedicamento({...novoMedicamento, dataFim: e.target.value})}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Observações</label>
                <textarea
                  value={novoMedicamento.observacoes}
                  onChange={(e) => setNovoMedicamento({...novoMedicamento, observacoes: e.target.value})}
                  placeholder="Instruções especiais, efeitos colaterais, etc."
                />
              </div>

              <div className="form-buttons">
                <button type="button" onClick={() => {
                  setShowForm(false);
                  resetForm();
                  setEditingId(null);
                }}>
                  Cancelar
                </button>
                <button type="submit">
                  {editingId ? 'Salvar Alterações' : 'Adicionar Medicamento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="medicamentos-content">
        {medicamentos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💊</div>
            <h3>Nenhum medicamento cadastrado</h3>
            <p>Adicione seus medicamentos para receber lembretes e acompanhar o tratamento.</p>
            <button 
              className="btn-primary"
              onClick={() => setShowForm(true)}
            >
              Adicionar Primeiro Medicamento
            </button>
          </div>
        ) : (
          <div className="medicamentos-grid">
            {medicamentos.map(medicamento => (
              <div key={medicamento.id} className="medicamento-card">
                <div className="medicamento-header">
                  <h3>{medicamento.nome}</h3>
                  <div 
                    className="status-indicator"
                    style={{ backgroundColor: getStatusColor(medicamento) }}
                  ></div>
                </div>
                
                <div className="medicamento-info">
                  <p><strong>Dosagem:</strong> {medicamento.dosagem}</p>
                  <p><strong>Frequência:</strong> {medicamento.frequencia}</p>
                  
                  {medicamento.horarios.length > 0 && (
                    <div className="horarios">
                      <strong>Horários:</strong>
                      <div className="horarios-display">
                        {medicamento.horarios.map((horario, index) => (
                          <span key={index} className="horario-display">{horario}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <p><strong>Período:</strong> {medicamento.dataInicio} {medicamento.dataFim && `até ${medicamento.dataFim}`}</p>
                  
                  {medicamento.observacoes && (
                    <p><strong>Observações:</strong> {medicamento.observacoes}</p>
                  )}
                </div>

                <div className="medicamento-actions">
                  <button 
                    className={`btn-status ${medicamento.ativo ? 'ativo' : 'inativo'}`}
                    onClick={() => toggleStatus(medicamento.id)}
                  >
                    {medicamento.ativo ? 'Pausar' : 'Ativar'}
                  </button>
                  <button 
                    className="btn-edit"
                    onClick={() => editarMedicamento(medicamento)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn-delete"
                    onClick={() => excluirMedicamento(medicamento.id)}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Medicamentos;
