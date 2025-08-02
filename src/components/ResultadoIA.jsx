import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultadoIA.css';

export default function ResultadoIA() {
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);
  const [resultado, setResultado] = useState(null);

  useEffect(() => {
    // Simula processamento da IA com delay
    const timer = setTimeout(() => {
      const dadosAnamnese = JSON.parse(localStorage.getItem('anamnese')) || {};
      const examesEnviados = JSON.parse(localStorage.getItem('exames')) || [];
      
      const sugestaoIA = {
        diagnosticosProvaveis: [
          "Síndrome metabólica",
          "Hipertensão leve",
          "Resistência à insulina"
        ],
        especialidadesRecomendadas: [
          "Endocrinologia",
          "Cardiologia",
          "Nutrologia"
        ],
        orientacoesGerais: "Recomenda-se avaliação médica especializada, mudança no estilo de vida e exames complementares."
      };

      // Salva o resultado da IA no localStorage
      localStorage.setItem('resultadoIA', JSON.stringify(sugestaoIA));

      // Salva o paciente completo na lista de pacientes
      const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
      const novoPaciente = {
        ...dadosAnamnese,
        exames: examesEnviados,
        resultadoIA: sugestaoIA,
        dataCadastro: new Date().toISOString(),
        status: 'Em acompanhamento'
      };
      pacientes.push(novoPaciente);
      localStorage.setItem('pacientes', JSON.stringify(pacientes));

      setResultado(sugestaoIA);
      setCarregando(false);
    }, 3000); // 3 segundos de "processamento"

    return () => clearTimeout(timer);
  }, []);

  const lerResultado = () => {
    if (resultado) {
      const texto = `
        Diagnósticos prováveis: ${resultado.diagnosticosProvaveis.join(', ')}. 
        Especialidades recomendadas: ${resultado.especialidadesRecomendadas.join(', ')}. 
        Orientações: ${resultado.orientacoesGerais}
      `;
      const msg = new SpeechSynthesisUtterance(texto);
      msg.lang = 'pt-BR';
      msg.rate = 1;
      window.speechSynthesis.speak(msg);
    }
  };

  return (
    <div className="resultado-container">
      <div className="resultado-card">
        <h2>Resultado da Avaliação com IA</h2>
        
        {carregando ? (
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>⏳ Processando dados e exames enviados...</p>
          </div>
        ) : (
          <div className="resultado-content">
            <div className="resultado-section">
              <h3>🩺 Diagnósticos Prováveis:</h3>
              <ul>
                {resultado.diagnosticosProvaveis.map((diag, index) => (
                  <li key={index}>{diag}</li>
                ))}
              </ul>
            </div>

            <div className="resultado-section">
              <h3>👨‍⚕️ Especialidades Médicas Recomendadas:</h3>
              <ul>
                {resultado.especialidadesRecomendadas.map((esp, index) => (
                  <li key={index}>{esp}</li>
                ))}
              </ul>
            </div>

            <div className="resultado-section">
              <h3>📌 Orientações:</h3>
              <p>{resultado.orientacoesGerais}</p>
            </div>

            <div className="actions">
              <button onClick={lerResultado} className="voice-btn">
                🔊 Ouvir Resultado
              </button>
              <button onClick={() => navigate('/dashboard')} className="dashboard-btn">
                Ir para o painel do paciente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
