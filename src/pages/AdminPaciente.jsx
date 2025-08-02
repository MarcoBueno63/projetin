import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './AdminPaciente.css';

export default function AdminPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState(null);
  const [obs, setObs] = useState('');

  useEffect(() => {
    const pacientesData = JSON.parse(localStorage.getItem('pacientes')) || [];
    setPacientes(pacientesData);
    const pacienteData = pacientesData[parseInt(id)];
    setPaciente(pacienteData);
    setObs(pacienteData?.observacoes || '');
  }, [id]);

  const salvarObservacoes = () => {
    const pacientesAtualizados = [...pacientes];
    pacientesAtualizados[id].observacoes = obs;
    localStorage.setItem('pacientes', JSON.stringify(pacientesAtualizados));
    setPacientes(pacientesAtualizados);
    alert('Observações salvas com sucesso!');
  };

  const atualizarStatus = (novoStatus) => {
    const pacientesAtualizados = [...pacientes];
    pacientesAtualizados[id].status = novoStatus;
    localStorage.setItem('pacientes', JSON.stringify(pacientesAtualizados));
    setPacientes(pacientesAtualizados);
    setPaciente(pacientesAtualizados[id]);
    alert('Status atualizado!');
  };

  if (!sessionStorage.getItem('admin')) {
    navigate('/admin');
    return null;
  }

  if (!paciente) {
    return (
      <div className="admin-paciente-container">
        <p className="error-message">Paciente não encontrado.</p>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          Voltar
        </button>
      </div>
    );
  }

  return (
    <div className="admin-paciente-container">
      <div className="admin-paciente-header">
        <h2>📋 Paciente: {paciente.nome}</h2>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          ← Voltar
        </button>
      </div>

      <div className="admin-paciente-content">
        <div className="patient-info-section">
          <h3>👤 Dados Pessoais</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Nome:</strong> {paciente.nome}
            </div>
            <div className="info-item">
              <strong>Idade:</strong> {paciente.idade}
            </div>
            <div className="info-item">
              <strong>Gênero:</strong> {paciente.genero}
            </div>
            <div className="info-item">
              <strong>Data de Cadastro:</strong> {new Date(paciente.dataCadastro).toLocaleString()}
            </div>
          </div>
        </div>

        <div className="patient-info-section">
          <h3>📝 Anamnese</h3>
          <div className="info-grid">
            <div className="info-item">
              <strong>Sintomas:</strong> {paciente.sintomas}
            </div>
            <div className="info-item">
              <strong>Hipertensão:</strong> {paciente.temHipertensao ? "Sim" : "Não"}
            </div>
            {paciente.temHipertensao && (
              <div className="info-item">
                <strong>Medicamentos:</strong> {paciente.medicamentosHipertensao}
              </div>
            )}
            <div className="info-item">
              <strong>Histórico Familiar:</strong> {paciente.historicoFamiliar}
            </div>
            <div className="info-item">
              <strong>Atividade Física:</strong> {paciente.atividadeFisica}
            </div>
          </div>
        </div>

        <div className="patient-info-section">
          <h3>📂 Exames Enviados</h3>
          <div className="exames-list">
            {paciente.exames && paciente.exames.length > 0 ? (
              <ul>
                {paciente.exames.map((exame, index) => (
                  <li key={index}>{exame}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhum exame enviado.</p>
            )}
          </div>
        </div>

        <div className="patient-info-section">
          <h3>🤖 Resultado da IA</h3>
          <div className="ia-result">
            {paciente.resultadoIA && (
              <>
                <div className="result-item">
                  <strong>Diagnósticos Prováveis:</strong>
                  <ul>
                    {paciente.resultadoIA.diagnosticosProvaveis.map((diag, index) => (
                      <li key={index}>{diag}</li>
                    ))}
                  </ul>
                </div>
                <div className="result-item">
                  <strong>Especialidades Recomendadas:</strong> {paciente.resultadoIA.especialidadesRecomendadas.join(', ')}
                </div>
                <div className="result-item">
                  <strong>Orientações:</strong> {paciente.resultadoIA.orientacoesGerais}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="patient-info-section">
          <h3>📌 Status Clínico</h3>
          <div className="status-controls">
            <select
              value={paciente.status || 'Em acompanhamento'}
              onChange={(e) => atualizarStatus(e.target.value)}
              className="status-select"
            >
              <option value="Em acompanhamento">Em acompanhamento</option>
              <option value="Encaminhado">Encaminhado</option>
              <option value="Alta">Alta</option>
              <option value="Observação">Observação</option>
            </select>
          </div>
        </div>

        <div className="patient-info-section">
          <h3>📝 Observações Clínicas</h3>
          <div className="observations-controls">
            <textarea
              className="observations-textarea"
              value={obs}
              onChange={(e) => setObs(e.target.value)}
              placeholder="Adicione observações sobre o paciente..."
              rows="5"
            />
            <button onClick={salvarObservacoes} className="save-btn">
              💾 Salvar Observações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
