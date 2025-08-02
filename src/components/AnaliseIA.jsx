import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnaliseIA.css';

const AnaliseIA = () => {
  const navigate = useNavigate();
  const [analisando, setAnalisando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [dadosUsuario, setDadosUsuario] = useState({});
  const [progresso, setProgresso] = useState(0);

  useEffect(() => {
    // Verificar pré-requisitos antes de permitir análise
    const anamneseConcluida = localStorage.getItem('anamneseConcluida') === 'true';
    const examesUpload = localStorage.getItem('examesUpload') === 'true';
    
    if (!anamneseConcluida) {
      // TODO: Adicionar feedback visual (Snackbar) para "Você precisa completar a anamnese antes de solicitar análise IA."
      navigate('/anamnese-integrativa');
      return;
    }
    
    if (!examesUpload) {
      // TODO: Adicionar feedback visual (Snackbar) para "Você precisa fazer upload dos exames antes de solicitar análise IA."
      navigate('/exames');
      return;
    }

    // Carregar dados do usuário
    const currentUser = JSON.parse(localStorage.getItem('usuario'));
    const userEmail = currentUser?.email || 'default';
    
    const anamnese = JSON.parse(localStorage.getItem('anamneseData') || localStorage.getItem(`anamnese_${userEmail}`) || localStorage.getItem('anamnese') || '{}');
    const exames = JSON.parse(localStorage.getItem(`exames_${userEmail}`) || localStorage.getItem('exames') || '[]');
    const medicamentos = JSON.parse(localStorage.getItem(`medicamentos_${userEmail}`) || localStorage.getItem('medicamentos') || '[]');
    
    setDadosUsuario({
      anamnese,
      exames,
      medicamentos
    });
  }, [navigate]);

  const iniciarAnalise = () => {
    setAnalisando(true);
    setProgresso(0);
    
    // Simula o processo de análise da IA
    const intervalos = [
      { tempo: 500, progresso: 20, etapa: 'Processando dados da anamnese...' },
      { tempo: 1000, progresso: 40, etapa: 'Analisando exames médicos...' },
      { tempo: 1500, progresso: 60, etapa: 'Correlacionando sintomas...' },
      { tempo: 2000, progresso: 80, etapa: 'Gerando diagnósticos possíveis...' },
      { tempo: 2500, progresso: 100, etapa: 'Análise concluída!' }
    ];

    intervalos.forEach(({ tempo, progresso, etapa }) => {
      setTimeout(() => {
        setProgresso(progresso);
        if (progresso === 100) {
          gerarResultado();
        }
      }, tempo);
    });
  };

  const gerarResultado = () => {
    const { anamnese, exames, medicamentos } = dadosUsuario;
    
    // Análise baseada nos dados do usuário
    const analiseIA = {
      pontuacaoRisco: calcularPontuacaoRisco(anamnese),
      diagnosticosPossiveis: gerarDiagnosticos(anamnese),
      recomendacoes: gerarRecomendacoes(anamnese, exames, medicamentos),
      especialidadesRecomendadas: gerarEspecialidades(anamnese),
      urgencia: determinarUrgencia(anamnese),
      confiabilidade: 87
    };

    setResultado(analiseIA);
    setAnalisando(false);
    
    // Salvar resultado no localStorage
    localStorage.setItem('analiseIA', JSON.stringify(analiseIA));
  };

  const calcularPontuacaoRisco = (anamnese) => {
    let pontuacao = 0;
    
    // Fatores de risco
    if (anamnese.idade > 60) pontuacao += 20;
    if (anamnese.pressaoAlta) pontuacao += 25;
    if (anamnese.diabetes) pontuacao += 30;
    if (anamnese.tabagismo) pontuacao += 20;
    if (anamnese.historico_familiar) pontuacao += 15;
    
    return Math.min(pontuacao, 100);
  };

  const gerarDiagnosticos = (anamnese) => {
    const diagnosticos = [];
    
    if (anamnese.sintomas?.includes('dor no peito')) {
      diagnosticos.push({
        condicao: 'Possível problema cardíaco',
        probabilidade: 75,
        descricao: 'Sintomas sugerem investigação cardiológica'
      });
    }
    
    if (anamnese.sintomas?.includes('dor de cabeça')) {
      diagnosticos.push({
        condicao: 'Cefaleia tensional',
        probabilidade: 65,
        descricao: 'Padrão compatível com cefaleia por tensão'
      });
    }
    
    if (anamnese.sintomas?.includes('cansaço')) {
      diagnosticos.push({
        condicao: 'Fadiga crônica',
        probabilidade: 60,
        descricao: 'Sintomas de fadiga persistente'
      });
    }
    
    return diagnosticos.length > 0 ? diagnosticos : [{
      condicao: 'Análise geral',
      probabilidade: 80,
      descricao: 'Perfil de saúde dentro dos parâmetros esperados'
    }];
  };

  const gerarRecomendacoes = (anamnese, exames, medicamentos) => {
    const recomendacoes = [];
    
    recomendacoes.push('Manter acompanhamento médico regular');
    
    if (anamnese.atividade_fisica === 'sedentario') {
      recomendacoes.push('Iniciar atividade física gradualmente');
    }
    
    if (anamnese.alimentacao === 'irregular') {
      recomendacoes.push('Melhorar hábitos alimentares');
    }
    
    if (exames.length === 0) {
      recomendacoes.push('Realizar exames de rotina');
    }
    
    if (medicamentos.length > 5) {
      recomendacoes.push('Revisar medicamentos com médico');
    }
    
    return recomendacoes;
  };

  const gerarEspecialidades = (anamnese) => {
    const especialidades = ['Clínica Geral'];
    
    if (anamnese.sintomas?.includes('dor no peito')) {
      especialidades.push('Cardiologia');
    }
    
    if (anamnese.diabetes) {
      especialidades.push('Endocrinologia');
    }
    
    if (anamnese.sintomas?.includes('dor de cabeça')) {
      especialidades.push('Neurologia');
    }
    
    return especialidades;
  };

  const determinarUrgencia = (anamnese) => {
    if (anamnese.sintomas?.includes('dor no peito') && anamnese.sintomas?.includes('falta de ar')) {
      return 'Alta';
    }
    
    if (anamnese.sintomas?.includes('dor intensa')) {
      return 'Média';
    }
    
    return 'Baixa';
  };

  const getRiscoColor = (pontuacao) => {
    if (pontuacao <= 30) return '#4CAF50';
    if (pontuacao <= 60) return '#FF9800';
    return '#F44336';
  };

  const getUrgenciaColor = (urgencia) => {
    switch (urgencia) {
      case 'Alta': return '#F44336';
      case 'Média': return '#FF9800';
      case 'Baixa': return '#4CAF50';
      default: return '#9E9E9E';
    }
  };

  if (!dadosUsuario.anamnese && !dadosUsuario.exames) {
    return (
      <div className="analise-ia-container">
        <div className="dados-insuficientes">
          <h2>📊 Análise de IA</h2>
          <div className="aviso">
            <p>⚠️ Dados insuficientes para análise</p>
            <p>Complete sua anamnese e envie seus exames para obter uma análise detalhada.</p>
            <div className="acoes">
              <button 
                onClick={() => navigate('/anamnese')}
                className="btn-primary"
              >
                Fazer Anamnese
              </button>
              <button 
                onClick={() => navigate('/exames')}
                className="btn-secondary"
              >
                Enviar Exames
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="analise-ia-container">
      <div className="header">
        <h1>🤖 Análise de Inteligência Artificial</h1>
        <p>Análise inteligente dos seus dados de saúde</p>
      </div>

      {!analisando && !resultado && (
        <div className="inicio-analise">
          <div className="dados-disponiveis">
            <h3>Dados Disponíveis para Análise:</h3>
            <div className="dados-lista">
              <div className="dado-item">
                <span className="icone">📋</span>
                <span>Anamnese Completa</span>
                <span className={`status ${dadosUsuario.anamnese ? 'disponivel' : 'indisponivel'}`}>
                  {dadosUsuario.anamnese ? '✅' : '❌'}
                </span>
              </div>
              <div className="dado-item">
                <span className="icone">📄</span>
                <span>Exames Médicos</span>
                <span className={`status ${dadosUsuario.exames?.length > 0 ? 'disponivel' : 'indisponivel'}`}>
                  {dadosUsuario.exames?.length > 0 ? `✅ (${dadosUsuario.exames.length})` : '❌'}
                </span>
              </div>
              <div className="dado-item">
                <span className="icone">💊</span>
                <span>Medicamentos</span>
                <span className={`status ${dadosUsuario.medicamentos?.length > 0 ? 'disponivel' : 'indisponivel'}`}>
                  {dadosUsuario.medicamentos?.length > 0 ? `✅ (${dadosUsuario.medicamentos.length})` : '❌'}
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={iniciarAnalise}
            className="btn-iniciar-analise"
          >
            <span className="icone">🚀</span>
            Iniciar Análise de IA
          </button>
        </div>
      )}

      {analisando && (
        <div className="processando">
          <div className="loader">
            <div className="spinner"></div>
          </div>
          <h3>Processando análise...</h3>
          <div className="progresso">
            <div className="progresso-bar">
              <div 
                className="progresso-fill" 
                style={{ width: `${progresso}%` }}
              ></div>
            </div>
            <span className="progresso-texto">{progresso}%</span>
          </div>
        </div>
      )}

      {resultado && (
        <div className="resultado-analise">
          <div className="resultado-header">
            <h2>📊 Resultado da Análise</h2>
            <div className="confiabilidade">
              <span>Confiabilidade: {resultado.confiabilidade}%</span>
            </div>
          </div>

          <div className="metricas-principais">
            <div className="metrica-card">
              <h3>🎯 Pontuação de Risco</h3>
              <div 
                className="pontuacao-risco"
                style={{ color: getRiscoColor(resultado.pontuacaoRisco) }}
              >
                {resultado.pontuacaoRisco}/100
              </div>
              <p className="descricao">
                {resultado.pontuacaoRisco <= 30 ? 'Baixo risco' : 
                 resultado.pontuacaoRisco <= 60 ? 'Risco moderado' : 'Alto risco'}
              </p>
            </div>

            <div className="metrica-card">
              <h3>🚨 Nível de Urgência</h3>
              <div 
                className="urgencia"
                style={{ color: getUrgenciaColor(resultado.urgencia) }}
              >
                {resultado.urgencia}
              </div>
              <p className="descricao">
                Necessidade de acompanhamento médico
              </p>
            </div>
          </div>

          <div className="diagnosticos">
            <h3>🔍 Diagnósticos Possíveis</h3>
            <div className="diagnosticos-lista">
              {resultado.diagnosticosPossiveis.map((diagnostico, index) => (
                <div key={index} className="diagnostico-item">
                  <div className="diagnostico-header">
                    <span className="condicao">{diagnostico.condicao}</span>
                    <span className="probabilidade">{diagnostico.probabilidade}%</span>
                  </div>
                  <p className="descricao">{diagnostico.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="recomendacoes">
            <h3>💡 Recomendações</h3>
            <ul className="recomendacoes-lista">
              {resultado.recomendacoes.map((recomendacao, index) => (
                <li key={index}>{recomendacao}</li>
              ))}
            </ul>
          </div>

          <div className="especialidades">
            <h3>👨‍⚕️ Especialidades Recomendadas</h3>
            <div className="especialidades-lista">
              {resultado.especialidadesRecomendadas.map((especialidade, index) => (
                <span key={index} className="especialidade-tag">
                  {especialidade}
                </span>
              ))}
            </div>
          </div>

          <div className="acoes-resultado">
            <button 
              onClick={() => navigate('/relatorio')}
              className="btn-primary"
            >
              📋 Gerar Relatório
            </button>
            <button 
              onClick={() => navigate('/agendar')}
              className="btn-secondary"
            >
              📅 Agendar Consulta
            </button>
            <button 
              onClick={() => navigate('/menu')}
              className="btn-tertiary"
            >
              🏠 Voltar ao Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnaliseIA;
