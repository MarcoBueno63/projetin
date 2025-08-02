import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HistoricoMedico.css';

const HistoricoMedico = () => {
  const navigate = useNavigate();
  const [historico, setHistorico] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState('todos');
  const [buscaTexto, setBuscaTexto] = useState('');

  useEffect(() => {
    carregarHistorico();
  }, []);

  const carregarHistorico = () => {
    // Carregar dados de diferentes fontes
    const anamnese = JSON.parse(localStorage.getItem('anamnese')) || {};
    const exames = JSON.parse(localStorage.getItem('exames')) || [];
    const medicamentos = JSON.parse(localStorage.getItem('medicamentos')) || [];
    const analiseIA = JSON.parse(localStorage.getItem('analiseIA')) || {};
    const relatorioMedico = JSON.parse(localStorage.getItem('relatorioMedico')) || {};

    const itensHistorico = [];

    // Adicionar anamnese
    if (anamnese.dataPreenchimento) {
      itensHistorico.push({
        id: 'anamnese_' + Date.now(),
        tipo: 'anamnese',
        titulo: 'Anamnese Integrativa',
        data: anamnese.dataPreenchimento,
        descricao: 'Questionário de saúde preenchido',
        icone: '📋',
        detalhes: {
          sintomas: anamnese.sintomas || [],
          condicoes: anamnese.condicoes || [],
          medicamentos: anamnese.medicamentos || []
        }
      });
    }

    // Adicionar exames
    exames.forEach((exame, index) => {
      itensHistorico.push({
        id: 'exame_' + index,
        tipo: 'exame',
        titulo: exame.nome || 'Exame',
        data: exame.dataUpload || exame.data,
        descricao: `Exame ${exame.tipo || 'médico'} enviado`,
        icone: '📊',
        detalhes: {
          tipo: exame.tipo,
          arquivo: exame.arquivo,
          observacoes: exame.observacoes
        }
      });
    });

    // Adicionar medicamentos
    medicamentos.forEach((med, index) => {
      itensHistorico.push({
        id: 'medicamento_' + index,
        tipo: 'medicamento',
        titulo: med.nome || 'Medicamento',
        data: med.dataInicio || new Date().toISOString(),
        descricao: `Medicamento ${med.nome} adicionado`,
        icone: '💊',
        detalhes: {
          dosagem: med.dosagem,
          frequencia: med.frequencia,
          duracao: med.duracao
        }
      });
    });

    // Adicionar análise de IA
    if (analiseIA.dataAnalise) {
      itensHistorico.push({
        id: 'analise_ia',
        tipo: 'analise',
        titulo: 'Análise de IA',
        data: analiseIA.dataAnalise,
        descricao: 'Análise inteligente dos dados de saúde',
        icone: '🤖',
        detalhes: {
          pontuacaoRisco: analiseIA.pontuacaoRisco,
          diagnosticos: analiseIA.diagnosticosPossiveis,
          recomendacoes: analiseIA.recomendacoes
        }
      });
    }

    // Adicionar relatório médico
    if (relatorioMedico.dataGeracao) {
      itensHistorico.push({
        id: 'relatorio_medico',
        tipo: 'relatorio',
        titulo: 'Relatório Médico',
        data: relatorioMedico.dataGeracao,
        descricao: 'Relatório médico detalhado gerado',
        icone: '📄',
        detalhes: {
          resumo: relatorioMedico.resumo,
          conclusoes: relatorioMedico.conclusoes,
          proximosPassos: relatorioMedico.proximosPassos
        }
      });
    }

    // Ordenar por data (mais recente primeiro)
    itensHistorico.sort((a, b) => new Date(b.data) - new Date(a.data));

    setHistorico(itensHistorico);
  };

  const filtrarHistorico = () => {
    let historicoFiltrado = historico;

    // Filtrar por tipo
    if (filtroAtivo !== 'todos') {
      historicoFiltrado = historicoFiltrado.filter(item => item.tipo === filtroAtivo);
    }

    // Filtrar por texto
    if (buscaTexto) {
      historicoFiltrado = historicoFiltrado.filter(item =>
        item.titulo.toLowerCase().includes(buscaTexto.toLowerCase()) ||
        item.descricao.toLowerCase().includes(buscaTexto.toLowerCase())
      );
    }

    return historicoFiltrado;
  };

  const formatarData = (dataString) => {
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTipoColor = (tipo) => {
    const cores = {
      anamnese: '#2196F3',
      exame: '#4CAF50',
      medicamento: '#FF9800',
      analise: '#9C27B0',
      relatorio: '#607D8B',
      consulta: '#F44336'
    };
    return cores[tipo] || '#666';
  };

  const exportarHistorico = () => {
    const dados = {
      historico: historico,
      dataExportacao: new Date().toISOString(),
      usuario: JSON.parse(localStorage.getItem('usuario')) || {}
    };

    const blob = new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historico_medico_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const historicoFiltrado = filtrarHistorico();

  return (
    <div className="historico-container">
      <div className="historico-header">
        <button 
          onClick={() => navigate('/menu')}
          className="btn-voltar"
        >
          ← Voltar
        </button>
        <h1>📖 Histórico Médico</h1>
        <button 
          onClick={exportarHistorico}
          className="btn-exportar"
        >
          📤 Exportar
        </button>
      </div>

      <div className="historico-filtros">
        <div className="busca-container">
          <input
            type="text"
            placeholder="Buscar no histórico..."
            value={buscaTexto}
            onChange={(e) => setBuscaTexto(e.target.value)}
            className="busca-input"
          />
          <span className="busca-icon">🔍</span>
        </div>

        <div className="filtros-tipo">
          <button
            className={`filtro-btn ${filtroAtivo === 'todos' ? 'active' : ''}`}
            onClick={() => setFiltroAtivo('todos')}
          >
            Todos ({historico.length})
          </button>
          <button
            className={`filtro-btn ${filtroAtivo === 'anamnese' ? 'active' : ''}`}
            onClick={() => setFiltroAtivo('anamnese')}
          >
            📋 Anamnese
          </button>
          <button
            className={`filtro-btn ${filtroAtivo === 'exame' ? 'active' : ''}`}
            onClick={() => setFiltroAtivo('exame')}
          >
            📊 Exames
          </button>
          <button
            className={`filtro-btn ${filtroAtivo === 'medicamento' ? 'active' : ''}`}
            onClick={() => setFiltroAtivo('medicamento')}
          >
            💊 Medicamentos
          </button>
          <button
            className={`filtro-btn ${filtroAtivo === 'analise' ? 'active' : ''}`}
            onClick={() => setFiltroAtivo('analise')}
          >
            🤖 Análises
          </button>
          <button
            className={`filtro-btn ${filtroAtivo === 'relatorio' ? 'active' : ''}`}
            onClick={() => setFiltroAtivo('relatorio')}
          >
            📄 Relatórios
          </button>
        </div>
      </div>

      <div className="historico-content">
        {historicoFiltrado.length === 0 ? (
          <div className="historico-vazio">
            <div className="vazio-icon">📋</div>
            <h2>Nenhum registro encontrado</h2>
            <p>
              {buscaTexto || filtroAtivo !== 'todos' 
                ? 'Tente ajustar os filtros ou termo de busca'
                : 'Ainda não há registros no seu histórico médico'
              }
            </p>
            <button 
              onClick={() => navigate('/menu')}
              className="btn-adicionar"
            >
              Adicionar Informações
            </button>
          </div>
        ) : (
          <div className="historico-timeline">
            {historicoFiltrado.map((item) => (
              <div key={item.id} className="historico-item">
                <div 
                  className="item-marker"
                  style={{ backgroundColor: getTipoColor(item.tipo) }}
                >
                  {item.icone}
                </div>
                <div className="item-content">
                  <div className="item-header">
                    <h3>{item.titulo}</h3>
                    <span className="item-data">
                      {formatarData(item.data)}
                    </span>
                  </div>
                  <p className="item-descricao">{item.descricao}</p>
                  
                  {item.detalhes && (
                    <div className="item-detalhes">
                      {item.tipo === 'anamnese' && (
                        <div className="detalhes-anamnese">
                          {item.detalhes.sintomas.length > 0 && (
                            <div className="detalhe-grupo">
                              <strong>Sintomas:</strong>
                              <span>{item.detalhes.sintomas.join(', ')}</span>
                            </div>
                          )}
                          {item.detalhes.condicoes.length > 0 && (
                            <div className="detalhe-grupo">
                              <strong>Condições:</strong>
                              <span>{item.detalhes.condicoes.join(', ')}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {item.tipo === 'exame' && (
                        <div className="detalhes-exame">
                          <div className="detalhe-grupo">
                            <strong>Tipo:</strong>
                            <span>{item.detalhes.tipo || 'Não especificado'}</span>
                          </div>
                          {item.detalhes.observacoes && (
                            <div className="detalhe-grupo">
                              <strong>Observações:</strong>
                              <span>{item.detalhes.observacoes}</span>
                            </div>
                          )}
                        </div>
                      )}
                      
                      {item.tipo === 'medicamento' && (
                        <div className="detalhes-medicamento">
                          <div className="detalhe-grupo">
                            <strong>Dosagem:</strong>
                            <span>{item.detalhes.dosagem || 'Não especificado'}</span>
                          </div>
                          <div className="detalhe-grupo">
                            <strong>Frequência:</strong>
                            <span>{item.detalhes.frequencia || 'Não especificado'}</span>
                          </div>
                        </div>
                      )}
                      
                      {item.tipo === 'analise' && (
                        <div className="detalhes-analise">
                          <div className="detalhe-grupo">
                            <strong>Pontuação de Risco:</strong>
                            <span className={`risco-${item.detalhes.pontuacaoRisco > 70 ? 'alto' : item.detalhes.pontuacaoRisco > 40 ? 'medio' : 'baixo'}`}>
                              {item.detalhes.pontuacaoRisco}%
                            </span>
                          </div>
                          {item.detalhes.diagnosticos && item.detalhes.diagnosticos.length > 0 && (
                            <div className="detalhe-grupo">
                              <strong>Diagnósticos:</strong>
                              <span>{item.detalhes.diagnosticos.length} encontrados</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="historico-resumo">
        <h2>📊 Resumo do Histórico</h2>
        <div className="resumo-cards">
          <div className="resumo-card">
            <div className="resumo-numero">{historico.filter(i => i.tipo === 'anamnese').length}</div>
            <div className="resumo-label">Anamneses</div>
          </div>
          <div className="resumo-card">
            <div className="resumo-numero">{historico.filter(i => i.tipo === 'exame').length}</div>
            <div className="resumo-label">Exames</div>
          </div>
          <div className="resumo-card">
            <div className="resumo-numero">{historico.filter(i => i.tipo === 'medicamento').length}</div>
            <div className="resumo-label">Medicamentos</div>
          </div>
          <div className="resumo-card">
            <div className="resumo-numero">{historico.filter(i => i.tipo === 'analise').length}</div>
            <div className="resumo-label">Análises</div>
          </div>
          <div className="resumo-card">
            <div className="resumo-numero">{historico.filter(i => i.tipo === 'relatorio').length}</div>
            <div className="resumo-label">Relatórios</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoricoMedico;
