import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { 
  medicosDatabase, 
  buscarMedicosPorEspecialidade, 
  obterEspecialidades, 
  verificarDisponibilidade,
  agendarConsulta,
  buscarMedicoPorId
} from '../services/medicosService';
import './AgendarConsulta.css';

export default function AgendarConsulta() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [motivo, setMotivo] = useState('');
  const [availableDoctors, setAvailableDoctors] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');

  // Carregar especialidades na inicialização
  useEffect(() => {
    setEspecialidades(obterEspecialidades());
  }, []);

  // Buscar médicos quando especialidade é selecionada
  useEffect(() => {
    if (selectedSpecialty) {
      const medicos = buscarMedicosPorEspecialidade(selectedSpecialty);
      setAvailableDoctors(medicos);
      setSelectedDoctor('');
      setAvailableTimes([]);
    }
  }, [selectedSpecialty]);

  // Atualizar horários disponíveis quando médico e data são selecionados
  useEffect(() => {
    if (selectedDoctor && selectedDate) {
      const medico = buscarMedicoPorId(selectedDoctor);
      if (medico) {
        const diaSemana = selectedDate.toLocaleDateString('pt-BR', { weekday: 'long' });
        const diaFormatado = diaSemana.replace('-feira', '');
        
        if (medico.diasDisponiveis.includes(diaFormatado)) {
          setAvailableTimes(medico.horarios);
        } else {
          setAvailableTimes([]);
        }
      }
    }
  }, [selectedDoctor, selectedDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      // Validações
      if (!selectedDate || !selectedTime || !selectedSpecialty || !selectedDoctor || !motivo) {
        throw new Error('Por favor, preencha todos os campos.');
      }

      // Verificar disponibilidade
      if (!verificarDisponibilidade(selectedDoctor, selectedDate, selectedTime)) {
        throw new Error('Horário não disponível. Por favor, escolha outro.');
      }

      // Obter dados do paciente
      const dadosPaciente = JSON.parse(localStorage.getItem('anamnese')) || {};
      
      // Criar agendamento
      const agendamento = {
        pacienteId: dadosPaciente.nome || 'Paciente',
        medicoId: parseInt(selectedDoctor),
        especialidade: selectedSpecialty,
        data: selectedDate.toISOString().split('T')[0],
        hora: selectedTime,
        motivo: motivo,
        status: 'Agendado'
      };

      // Salvar agendamento
      const novoAgendamento = agendarConsulta(agendamento);
      
      setMensagem('✅ Consulta agendada com sucesso!');
      
      // Limpar formulário
      setTimeout(() => {
        setSelectedDate(null);
        setSelectedTime('');
        setSelectedSpecialty('');
        setSelectedDoctor('');
        setMotivo('');
        setMensagem('');
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      setMensagem(`❌ Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getMedicoInfo = (medicoId) => {
    return buscarMedicoPorId(medicoId);
  };

  return (
    <div className="agendar-container">
      <div className="agendar-card">
        <div className="agendar-header">
          <button 
            onClick={() => navigate('/dashboard')} 
            className="back-button"
          >
            ← Voltar
          </button>
          <h2>📅 Agendar Consulta</h2>
        </div>

        <form onSubmit={handleSubmit} className="agendar-form">
          {/* Especialidade */}
          <div className="form-group">
            <label htmlFor="especialidade">Especialidade:</label>
            <select
              id="especialidade"
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              required
            >
              <option value="">Selecione uma especialidade</option>
              {especialidades.map(especialidade => (
                <option key={especialidade} value={especialidade}>
                  {especialidade}
                </option>
              ))}
            </select>
          </div>

          {/* Médico */}
          {selectedSpecialty && (
            <div className="form-group">
              <label htmlFor="medico">Médico:</label>
              <select
                id="medico"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                required
              >
                <option value="">Selecione um médico</option>
                {availableDoctors.map(medico => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nome} - CRM: {medico.crm} - R$ {medico.preco.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Informações do médico selecionado */}
          {selectedDoctor && (
            <div className="medico-info">
              {(() => {
                const medico = getMedicoInfo(selectedDoctor);
                return medico ? (
                  <div className="medico-card">
                    <img src={medico.foto} alt={medico.nome} className="medico-foto" />
                    <div className="medico-details">
                      <h3>{medico.nome}</h3>
                      <p><strong>Especialidade:</strong> {medico.especialidade}</p>
                      <p><strong>CRM:</strong> {medico.crm}</p>
                      <p><strong>Hospital:</strong> {medico.hospital}</p>
                      <p><strong>Avaliação:</strong> ⭐ {medico.avaliacoes}/5</p>
                      <p><strong>Preço:</strong> R$ {medico.preco.toFixed(2)}</p>
                      <p><strong>Telefone:</strong> {medico.telefone}</p>
                    </div>
                  </div>
                ) : null;
              })()}
            </div>
          )}

          {/* Data */}
          {selectedDoctor && (
            <div className="form-group">
              <label>Data da Consulta:</label>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)} // 30 dias
                dateFormat="dd/MM/yyyy"
                placeholderText="Selecione uma data"
                className="date-picker"
                required
              />
            </div>
          )}

          {/* Horário */}
          {selectedDate && availableTimes.length > 0 && (
            <div className="form-group">
              <label htmlFor="hora">Horário:</label>
              <select
                id="hora"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="">Selecione um horário</option>
                {availableTimes.map(hora => (
                  <option key={hora} value={hora}>
                    {hora}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Motivo */}
          {selectedTime && (
            <div className="form-group">
              <label htmlFor="motivo">Motivo da Consulta:</label>
              <textarea
                id="motivo"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                placeholder="Descreva o motivo da consulta..."
                rows="4"
                required
              />
            </div>
          )}

          {/* Mensagem */}
          {mensagem && (
            <div className={`message ${mensagem.includes('✅') ? 'success' : 'error'}`}>
              {mensagem}
            </div>
          )}

          {/* Botão de envio */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading || !selectedDate || !selectedTime || !selectedSpecialty || !selectedDoctor || !motivo}
          >
            {loading ? 'Agendando...' : 'Agendar Consulta'}
          </button>
        </form>
      </div>
    </div>
  );
}
