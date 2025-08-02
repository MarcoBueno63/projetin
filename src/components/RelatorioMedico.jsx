import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RelatorioMedico.css';

const RelatorioMedico = () => {
  const navigate = useNavigate();
  const [relatorio, setRelatorio] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [dadosCompletos, setDadosCompletos] = useState(false);

  useEffect(() => {
    carregarDados();
  }, []);

  const carregarDados = () => {
    const anamnese = JSON.parse(localStorage.getItem('anamnese')) || {};
    const exames = JSON.parse(localStorage.getItem('exames')) || [];
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const analiseIA = JSON.parse(localStorage.getItem('analiseIA')) || {};

    if (Object.keys(anamnese).length > 0) {
      setDadosCompletos(true);
      gerarRelatorio(anamnese, exames, medicamentos, analiseIA);
    } else {
      setDadosCompletos(false);
    }
    
    setCarregando(false);
  };

  const gerarRelatorio = (anamnese, exames, medicamentos, analiseIA) => {
    const dataAtual = new Date();
    const relatorioGerado = {
      id: `REL-${Date.now()}`,
      dataGeracao: dataAtual.toLocaleDateString('pt-BR'),
      paciente: {
        nome: anamnese.nome || 'Não informado',
        idade: anamnese.idade || 'Não informado',
        sexo: anamnese.sexo || 'Não informado',
        email: anamnese.email || 'Não informado',
        telefone: anamnese.telefone || 'Não informado'
      },
      resumoExecutivo: gerarResumoExecutivo(anamnese, analiseIA),
      historico: {
        sintomas: anamnese.sintomas || [],
        historicoMedico: anamnese.historico_medico || 'Não informado',
        alergias: anamnese.alergias || 'Não informado',
        medicamentosAtuais: medicamentos.length > 0 ? medicamentos : ['Nenhum medicamento reportado']
      },
      exames: {
        quantidade: exames.length,
        lista: exames.map(exame => ({
          nome: exame.nome || exame.file?.name || 'Exame',
          data: exame.data || 'Data não informada',
          tipo: exame.tipo || 'Tipo não especificado'
        }))
      },
      analiseIA: analiseIA.diagnosticosPossiveis ? {
        pontuacaoRisco: analiseIA.pontuacaoRisco || 0,
        diagnosticos: analiseIA.diagnosticosPossiveis || [],
        recomendacoes: analiseIA.recomendacoes || [],
        especialidades: analiseIA.especialidadesRecomendadas || [],
        suplementosIndicados: analiseIA.suplementosIndicados || [],
        urgencia: analiseIA.urgencia || 'Baixa',
        confiabilidade: analiseIA.confiabilidade || 0
      } : null,
      conclusoes: gerarConclusoes(anamnese, analiseIA),
      proximosPassos: gerarProximosPassos(anamnese, analiseIA)
    };

    setRelatorio(relatorioGerado);
    
    // Salvar no localStorage
    localStorage.setItem('relatorioMedico', JSON.stringify(relatorioGerado));
  };

  const gerarResumoExecutivo = (anamnese, analiseIA) => {
    const idade = anamnese.idade || 'idade não informada';
    const sexo = anamnese.sexo || 'sexo não informado';
    const sintomas = anamnese.sintomas?.length || 0;
    const risco = analiseIA.pontuacaoRisco || 0;
    
    return `Paciente de ${idade} anos, ${sexo}, apresentando ${sintomas} sintoma(s) principal(is). ` +
           `Análise de risco indica pontuação de ${risco}/100. ` +
           `${analiseIA.urgencia ? `Nível de urgência: ${analiseIA.urgencia}.` : ''}`;
  };

  const gerarConclusoes = (anamnese, analiseIA) => {
    const conclusoes = [];
    
    if (analiseIA.diagnosticosPossiveis?.length > 0) {
      conclusoes.push('Análise de IA sugere investigação médica especializada');
    }
    
    if (anamnese.sintomas?.length > 3) {
      conclusoes.push('Múltiplos sintomas reportados requerem avaliação médica');
    }
    
    if (analiseIA.pontuacaoRisco > 60) {
      conclusoes.push('Fatores de risco elevados identificados');
    }
    
    conclusoes.push('Recomenda-se acompanhamento médico regular');
    
    return conclusoes;
  };

  const gerarProximosPassos = (anamnese, analiseIA) => {
    const passos = [];
    
    passos.push('Agendar consulta médica');
    
    if (analiseIA.especialidadesRecomendadas?.length > 0) {
      passos.push(`Considerar consulta com: ${analiseIA.especialidadesRecomendadas.join(', ')}`);
    }
    
    if (anamnese.exames_recentes === 'nao') {
      passos.push('Realizar exames de rotina atualizados');
    }
    
    passos.push('Manter registro atualizado de sintomas');
    passos.push('Seguir recomendações médicas');
    
    return passos;
  };

  const exportarPDF = () => {
    // Simular exportação para PDF
    const elemento = document.createElement('a');
    const conteudo = `
RELATÓRIO MÉDICO

Paciente: ${relatorio.paciente.nome}
Data: ${relatorio.dataGeracao}

${document.getElementById('relatorio-completo').innerText}
    `;
    
    const arquivo = new Blob([conteudo], { type: 'text/plain' });
    elemento.href = URL.createObjectURL(arquivo);
    elemento.download = `relatorio-medico-${relatorio.id}.txt`;
    elemento.click();
  };

  const compartilharRelatorio = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Relatório Médico',
        text: `Relatório médico gerado em ${relatorio.dataGeracao}`,
        url: window.location.href
      });
    } else {
      // Fallback para navegadores que não suportam Web Share API
      const texto = `Relatório médico disponível: ${window.location.href}`;
      navigator.clipboard.writeText(texto);
      // TODO: Adicionar feedback visual (Snackbar) para link copiado
    }
  };

  if (carregando) {
    return (
      <div className="relatorio-container">
        <div className="carregando">
          <div className="spinner"></div>
          <p>Gerando relatório...</p>
        </div>
      </div>
    );
  }

  if (!dadosCompletos) {
    return (
      <div className="relatorio-container">
        <div className="dados-insuficientes">
          <h2>📊 Relatório Médico</h2>
          <div className="aviso">
            <p>⚠️ Dados insuficientes para gerar relatório</p>
            <p>Complete sua anamnese e faça a análise de IA para gerar um relatório médico detalhado.</p>
            <div className="acoes">
              <button 
                onClick={() => navigate('/anamnese')}
                className="btn-primary"
              >
                Fazer Anamnese
              </button>
              <button 
                onClick={() => navigate('/ia-analise')}
                className="btn-secondary"
              >
                Análise de IA
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relatorio-container">
      <div className="relatorio-header">
        <h1>📋 Relatório Médico</h1>
        <div className="acoes-header">
          <button onClick={exportarPDF} className="btn-exportar">
            📄 Exportar PDF
          </button>
          <button onClick={compartilharRelatorio} className="btn-compartilhar">
            📤 Compartilhar
          </button>
        </div>
      </div>

      <div id="relatorio-completo" className="relatorio-content">
        {/* Cabeçalho do Relatório */}
        <div className="relatorio-cabecalho">
          <div className="logo-area">
            <h2>🏥 HealthSystem</h2>
            <p>Sistema de Gestão de Saúde</p>
          </div>
          <div className="info-relatorio">
            <p><strong>Relatório ID:</strong> {relatorio.id}</p>
            <p><strong>Data de Geração:</strong> {relatorio.dataGeracao}</p>
          </div>
        </div>

        {/* Dados do Paciente */}
        <div className="secao-relatorio">
          <h3>👤 Dados do Paciente</h3>
          <div className="dados-paciente">
            <div className="campo">
              <label>Nome:</label>
              <span>{relatorio.paciente.nome}</span>
            </div>
            <div className="campo">
              <label>Idade:</label>
              <span>{relatorio.paciente.idade} anos</span>
            </div>
            <div className="campo">
              <label>Sexo:</label>
              <span>{relatorio.paciente.sexo}</span>
            </div>
            <div className="campo">
              <label>Email:</label>
              <span>{relatorio.paciente.email}</span>
            </div>
            <div className="campo">
              <label>Telefone:</label>
              <span>{relatorio.paciente.telefone}</span>
            </div>
          </div>
        </div>

        {/* Resumo Executivo */}
        <div className="secao-relatorio">
          <h3>📝 Resumo Executivo</h3>
          <p className="resumo-texto">{relatorio.resumoExecutivo}</p>
        </div>

        {/* Histórico Médico */}
        <div className="secao-relatorio">
          <h3>📋 Histórico Médico</h3>
          <div className="historico-grid">
            <div className="historico-item">
              <h4>🔍 Sintomas Reportados</h4>
              {relatorio.historico.sintomas.length > 0 ? (
                <ul>
                  {relatorio.historico.sintomas.map((sintoma, index) => (
                    <li key={index}>{sintoma}</li>
                  ))}
                </ul>
              ) : (
                <p>Nenhum sintoma reportado</p>
              )}
            </div>
            <div className="historico-item">
              <h4>⚕️ Histórico Médico</h4>
              <p>{relatorio.historico.historicoMedico}</p>
            </div>
            <div className="historico-item">
              <h4>🚫 Alergias</h4>
              <p>{relatorio.historico.alergias}</p>
            </div>
            <div className="historico-item">
              <h4>💊 Medicamentos Atuais</h4>
              <ul>
                {relatorio.historico.medicamentosAtuais.map((medicamento, index) => (
                  <li key={index}>
                    {typeof medicamento === 'string' ? medicamento : medicamento.nome}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Exames */}
        <div className="secao-relatorio">
          <h3>📄 Exames</h3>
          <div className="exames-info">
            <p><strong>Quantidade de exames:</strong> {relatorio.exames.quantidade}</p>
            {relatorio.exames.lista.length > 0 && (
              <div className="exames-lista">
                {relatorio.exames.lista.map((exame, index) => (
                  <div key={index} className="exame-item">
                    <span className="exame-nome">{exame.nome}</span>
                    <span className="exame-data">{exame.data}</span>
                    <span className="exame-tipo">{exame.tipo}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Análise de IA */}
        {relatorio.analiseIA && (
          <div className="secao-relatorio">
            <h3>🤖 Análise de Inteligência Artificial</h3>
            <div className="analise-metricas">
              <div className="metrica">
                <label>Pontuação de Risco:</label>
                <span className={`risco-${relatorio.analiseIA.pontuacaoRisco <= 30 ? 'baixo' : relatorio.analiseIA.pontuacaoRisco <= 60 ? 'medio' : 'alto'}`}>
                  {relatorio.analiseIA.pontuacaoRisco}/100
                </span>
              </div>
              <div className="metrica">
                <label>Nível de Urgência:</label>
                <span className={`urgencia-${relatorio.analiseIA.urgencia.toLowerCase()}`}>
                  {relatorio.analiseIA.urgencia}
                </span>
              </div>
              <div className="metrica">
                <label>Confiabilidade:</label>
                <span>{relatorio.analiseIA.confiabilidade}%</span>
              </div>
            </div>

            <div className="diagnosticos-relatorio">
              <h4>🔍 Diagnósticos Possíveis</h4>
              {relatorio.analiseIA.diagnosticos.map((diagnostico, index) => (
                <div key={index} className="diagnostico-relatorio">
                  <span className="diagnostico-nome">{diagnostico.condicao}</span>
                  <span className="diagnostico-probabilidade">{diagnostico.probabilidade}%</span>
                </div>
              ))}
            </div>


            <div className="recomendacoes-relatorio">
              <h4>💡 Recomendações da IA</h4>
              <ul>
                {relatorio.analiseIA.recomendacoes.map((recomendacao, index) => (
                  <li key={index}>{recomendacao}</li>
                ))}
              </ul>
            </div>

            {relatorio.analiseIA.suplementosIndicados && relatorio.analiseIA.suplementosIndicados.length > 0 && (
              <div className="suplementos-relatorio">
                <h4>🧴 Suplementos Sugeridos pela IA</h4>
                <ul>
                  {relatorio.analiseIA.suplementosIndicados.map((suplemento, index) => (
                    <li key={index}>{suplemento}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="especialidades-relatorio">
              <h4>👨‍⚕️ Especialidades Recomendadas</h4>
              <div className="especialidades-tags">
                {relatorio.analiseIA.especialidades.map((especialidade, index) => (
                  <span key={index} className="especialidade-tag">{especialidade}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Conclusões */}
        <div className="secao-relatorio">
          <h3>📊 Conclusões</h3>
          <ul className="conclusoes-lista">
            {relatorio.conclusoes.map((conclusao, index) => (
              <li key={index}>{conclusao}</li>
            ))}
          </ul>
        </div>

        {/* Próximos Passos */}
        <div className="secao-relatorio">
          <h3>🎯 Próximos Passos</h3>
          <ol className="proximos-passos">
            {relatorio.proximosPassos.map((passo, index) => (
              <li key={index}>{passo}</li>
            ))}
          </ol>
        </div>

        {/* Rodapé */}
        <div className="relatorio-rodape">
          <p><strong>Importante:</strong> Este relatório foi gerado automaticamente com base nas informações fornecidas. 
          Consulte sempre um médico para diagnóstico e tratamento adequados.</p>
          <p className="data-geracao">Relatório gerado em {relatorio.dataGeracao}</p>
        </div>
      </div>

      {/* Ações do Relatório */}
      <div className="acoes-relatorio">
        <button 
          onClick={() => navigate('/agendar')}
          className="btn-primary"
        >
          📅 Agendar Consulta
        </button>
        <button 
          onClick={() => navigate('/medicamentos')}
          className="btn-secondary"
        >
          💊 Gerenciar Medicamentos
        </button>
        <button 
          onClick={() => navigate('/menu')}
          className="btn-tertiary"
        >
          🏠 Voltar ao Menu
        </button>
      </div>
    </div>
  );
};

export default RelatorioMedico;
