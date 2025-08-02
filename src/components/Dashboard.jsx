import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exportarDadosParaExcel } from '../services/excelService';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();
  const [mensagemExport, setMensagemExport] = useState('');

  const dadosAnamnese = JSON.parse(localStorage.getItem('anamnese'));
  const examesEnviados = JSON.parse(localStorage.getItem('exames'));
  const resultadoIA = JSON.parse(localStorage.getItem('resultadoIA'));

  if (!dadosAnamnese || !examesEnviados || !resultadoIA) {
    return (
      <div className="dashboard-container">
        <div className="error-message">
          <p>⚠️ Dados incompletos. Por favor, refaça a anamnese.</p>
          <button
            onClick={() => navigate('/anamnese')}
            className="btn-primary"
          >
            Refazer Anamnese
          </button>
        </div>
      </div>
    );
  }

  const gerarPDF = () => {
    window.print();
  };

  const exportarParaExcel = () => {
    const resultado = exportarDadosParaExcel(dadosAnamnese, resultadoIA, examesEnviados);
    setMensagemExport(resultado.mensagem);
    
    setTimeout(() => {
      setMensagemExport('');
    }, 3000);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div id="relatorio">
          <h2>🏠 Painel do Paciente</h2>

          <div className="info-section">
            <h3>👤 Dados Pessoais</h3>
            <div className="info-grid">
              <p><strong>Nome:</strong> {dadosAnamnese.nome}</p>
              <p><strong>Idade:</strong> {dadosAnamnese.idade}</p>
              <p><strong>Gênero:</strong> {dadosAnamnese.genero}</p>
            </div>
          </div>

          <div className="info-section">
            <h3>📝 Anamnese</h3>
            <div className="info-grid">
              <p><strong>Sintomas:</strong> {dadosAnamnese.sintomas}</p>
              <p><strong>Hipertensão:</strong> {dadosAnamnese.temHipertensao ? "Sim" : "Não"}</p>
              {dadosAnamnese.temHipertensao && (
                <p><strong>Medicamentos:</strong> {dadosAnamnese.medicamentosHipertensao}</p>
              )}
              <p><strong>Histórico Familiar:</strong> {dadosAnamnese.historicoFamiliar}</p>
              <p><strong>Atividade Física:</strong> {dadosAnamnese.atividadeFisica}</p>
            </div>
          </div>

          <div className="info-section">
            <h3>📂 Exames Enviados</h3>
            <ul className="exames-list">
              {examesEnviados.map((exame, index) => (
                <li key={index}>{exame}</li>
              ))}
            </ul>
          </div>

          <div className="info-section">
            <h3>💡 Resultado da IA</h3>
            <div className="ia-result">
              <div className="result-item">
                <p><strong>Diagnósticos Prováveis:</strong></p>
                <ul>
                  {resultadoIA.diagnosticosProvaveis.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="result-item">
                <p><strong>Especialidades Recomendadas:</strong> {resultadoIA.especialidadesRecomendadas.join(", ")}</p>
              </div>

              <div className="result-item">
                <p><strong>Orientações:</strong> {resultadoIA.orientacoesGerais}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-actions">
          <button onClick={() => navigate('/dashboard-principal')} className="btn-primary">
            🏠 Dashboard Principal
          </button>
          <button onClick={gerarPDF} className="btn-success">
            📄 Exportar PDF
          </button>
          <button onClick={exportarParaExcel} className="btn-success">
            📊 Exportar Excel
          </button>
          <button onClick={() => navigate('/chat')} className="btn-primary">
            💬 Chat com Profissional
          </button>
          <button onClick={() => navigate('/agendar')} className="btn-info">
            📅 Agendar Consulta
          </button>
          <button onClick={() => navigate('/anamnese')} className="btn-warning">
            Refazer Anamnese
          </button>
          <button
            onClick={() => {
              localStorage.clear();
              navigate('/');
            }}
            className="btn-danger"
          >
            Sair e Limpar Dados
          </button>
        </div>

        {mensagemExport && (
          <div className="export-message">
            {mensagemExport}
          </div>
        )}
      </div>
    </div>
  );
}
