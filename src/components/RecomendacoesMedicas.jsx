import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecomendacoesMedicas.css';

const RecomendacoesMedicas = () => {
  const navigate = useNavigate();
  const [recomendacoes, setRecomendacoes] = useState([]);
  const [especialistas, setEspecialistas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [filtroEspecialidade, setFiltroEspecialidade] = useState('todas');

  useEffect(() => {
    carregarRecomendacoes();
  }, []);

  const carregarRecomendacoes = () => {
    setCarregando(true);
    
    // Carregar dados da análise de IA
    const analiseIA = JSON.parse(localStorage.getItem('analiseIA')) || {};
    const anamnese = JSON.parse(localStorage.getItem('anamnese')) || {};
    
    setTimeout(() => {
      const recomendacoesGeradas = gerarRecomendacoes(analiseIA, anamnese);
      const especialistasGerados = gerarEspecialistas(analiseIA, anamnese);
      
      setRecomendacoes(recomendacoesGeradas);
      setEspecialistas(especialistasGerados);
      setCarregando(false);
    }, 1500);
  };

  const gerarRecomendacoes = (analiseIA, anamnese) => {
    const recomendacoes = [];
    
    // Recomendações baseadas na análise de IA
    if (analiseIA.pontuacaoRisco > 70) {
      recomendacoes.push({
        id: 1,
        tipo: 'urgente',
        categoria: 'Consulta Médica',
        titulo: 'Consulta Médica Urgente',
        descricao: 'Recomendamos consulta médica urgente devido ao alto risco identificado.',
        prioridade: 'alta',
        prazo: '24-48 horas',
        icone: '🚨'
      });
    }
    
    if (analiseIA.diagnosticosPossiveis?.length > 0) {
      recomendacoes.push({
        id: 2,
        tipo: 'consulta',
        categoria: 'Especialista',
        titulo: 'Consulta com Especialista',
        descricao: 'Agende consulta com especialista para investigação detalhada.',
        prioridade: 'média',
        prazo: '1-2 semanas',
        icone: '👨‍⚕️'
      });
    }
    
    // Recomendações baseadas em sintomas
    if (anamnese.sintomas?.includes('dor no peito')) {
      recomendacoes.push({
        id: 3,
        tipo: 'exame',
        categoria: 'Exames',
        titulo: 'Exames Cardiológicos',
        descricao: 'Realize eletrocardiograma e ecocardiograma para investigação.',
        prioridade: 'alta',
        prazo: '1 semana',
        icone: '💓'
      });
    }
    
    if (anamnese.sintomas?.includes('dor de cabeça')) {
      recomendacoes.push({
        id: 4,
        tipo: 'exame',
        categoria: 'Exames',
        titulo: 'Exames Neurológicos',
        descricao: 'Considere realizar tomografia ou ressonância magnética.',
        prioridade: 'média',
        prazo: '2 semanas',
        icone: '🧠'
      });
    }
    
    // Recomendações gerais
    recomendacoes.push({
      id: 5,
      tipo: 'preventivo',
      categoria: 'Prevenção',
      titulo: 'Check-up Preventivo',
      descricao: 'Mantenha exames de rotina atualizados para prevenção.',
      prioridade: 'baixa',
      prazo: '3 meses',
      icone: '✅'
    });
    
    recomendacoes.push({
      id: 6,
      tipo: 'habitos',
      categoria: 'Estilo de Vida',
      titulo: 'Melhoria nos Hábitos',
      descricao: 'Adote hábitos saudáveis: exercícios, alimentação balanceada.',
      prioridade: 'média',
      prazo: 'Contínuo',
      icone: '🏃‍♂️'
    });
    
    return recomendacoes;
  };

  const gerarEspecialistas = (analiseIA, anamnese) => {
    const especialistas = [];
    
    // Especialistas baseados nos sintomas e diagnósticos
    if (anamnese.sintomas?.includes('dor no peito') || 
        analiseIA.diagnosticosPossiveis?.some(d => d.condicao.includes('cardíaco'))) {
      especialistas.push({
        id: 1,
        nome: 'Dr. Carlos Henrique',
        especialidade: 'Cardiologia',
        crm: 'CRM/SP 123456',
        foto: '👨‍⚕️',
        avaliacao: 4.9,
        experiencia: '15 anos',
        local: 'Hospital São Paulo',
        telefone: '(11) 99999-0001',
        disponibilidade: 'Seg-Sex 8h-18h',
        prioridade: 'alta'
      });
    }
    
    if (anamnese.sintomas?.includes('dor de cabeça')) {
      especialistas.push({
        id: 2,
        nome: 'Dra. Maria Santos',
        especialidade: 'Neurologia',
        crm: 'CRM/SP 234567',
        foto: '👩‍⚕️',
        avaliacao: 4.8,
        experiencia: '12 anos',
        local: 'Clínica Neurológica',
        telefone: '(11) 99999-0002',
        disponibilidade: 'Ter-Qui 9h-17h',
        prioridade: 'média'
      });
    }
    
    // Especialistas gerais
    especialistas.push({
      id: 3,
      nome: 'Dr. João Silva',
      especialidade: 'Clínica Geral',
      crm: 'CRM/SP 345678',
      foto: '👨‍⚕️',
      avaliacao: 4.7,
      experiencia: '20 anos',
      local: 'Clínica Saúde Total',
      telefone: '(11) 99999-0003',
      disponibilidade: 'Seg-Sex 7h-19h',
      prioridade: 'baixa'
    });
    
    especialistas.push({
      id: 4,
      nome: 'Dra. Ana Costa',
      especialidade: 'Endocrinologia',
      crm: 'CRM/SP 456789',
      foto: '👩‍⚕️',
      avaliacao: 4.9,
      experiencia: '18 anos',
      local: 'Hospital das Clínicas',
      telefone: '(11) 99999-0004',
      disponibilidade: 'Seg-Qua 8h-16h',
      prioridade: 'média'
    });
    
    return especialistas;
  };

  const getPrioridadeColor = (prioridade) => {
    switch(prioridade) {
      case 'alta': return '#dc3545';
      case 'média': return '#ffc107';
      case 'baixa': return '#28a745';
      default: return '#6c757d';
    }
  };

  const agendarConsulta = (especialista) => {
    // Salvar dados do especialista selecionado
    localStorage.setItem('especialistaSelecionado', JSON.stringify(especialista));
    navigate('/agendar');
  };

  const contatarEspecialista = (especialista) => {
    // Simular contato com especialista
    // TODO: Adicionar feedback visual (Snackbar) para contato com especialista
  };

  const filtrarEspecialistas = () => {
    if (filtroEspecialidade === 'todas') {
      return especialistas;
    }
    return especialistas.filter(esp => 
      esp.especialidade.toLowerCase().includes(filtroEspecialidade.toLowerCase())
    );
  };

  if (carregando) {
    return (
      <div className="recomendacoes-container">
        <div className="carregando">
          <div className="spinner"></div>
          <h2>Gerando Recomendações</h2>
          <p>Analisando seus dados de saúde...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="recomendacoes-container">
      <div className="recomendacoes-header">
        <button 
          onClick={() => navigate('/menu')}
          className="btn-voltar"
        >
          ← Voltar
        </button>
        <h1>👨‍⚕️ Recomendações Médicas</h1>
      </div>

      {/* Recomendações Prioritárias */}
      <div className="secao-recomendacoes">
        <h2>🎯 Recomendações Prioritárias</h2>
        <div className="recomendacoes-grid">
          {recomendacoes.map(rec => (
            <div 
              key={rec.id} 
              className={`recomendacao-card ${rec.prioridade}`}
              style={{ '--cor-prioridade': getPrioridadeColor(rec.prioridade) }}
            >
              <div className="recomendacao-header">
                <span className="recomendacao-icone">{rec.icone}</span>
                <div className="recomendacao-info">
                  <h3>{rec.titulo}</h3>
                  <span className="recomendacao-categoria">{rec.categoria}</span>
                </div>
                <div className={`prioridade-badge ${rec.prioridade}`}>
                  {rec.prioridade}
                </div>
              </div>
              <p className="recomendacao-descricao">{rec.descricao}</p>
              <div className="recomendacao-prazo">
                <span>⏰ Prazo: {rec.prazo}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Especialistas Recomendados */}
      <div className="secao-especialistas">
        <div className="especialistas-header">
          <h2>🩺 Especialistas Recomendados</h2>
          <select 
            value={filtroEspecialidade}
            onChange={(e) => setFiltroEspecialidade(e.target.value)}
            className="filtro-especialidade"
          >
            <option value="todas">Todas as Especialidades</option>
            <option value="cardiologia">Cardiologia</option>
            <option value="neurologia">Neurologia</option>
            <option value="clinica geral">Clínica Geral</option>
            <option value="endocrinologia">Endocrinologia</option>
          </select>
        </div>
        
        <div className="especialistas-grid">
          {filtrarEspecialistas().map(esp => (
            <div key={esp.id} className="especialista-card">
              <div className="especialista-foto">
                {esp.foto}
              </div>
              <div className="especialista-info">
                <h3>{esp.nome}</h3>
                <p className="especialista-especialidade">{esp.especialidade}</p>
                <p className="especialista-crm">{esp.crm}</p>
                <div className="especialista-avaliacao">
                  <span className="estrelas">⭐ {esp.avaliacao}</span>
                  <span className="experiencia">{esp.experiencia} de experiência</span>
                </div>
                <div className="especialista-detalhes">
                  <p><strong>Local:</strong> {esp.local}</p>
                  <p><strong>Telefone:</strong> {esp.telefone}</p>
                  <p><strong>Disponibilidade:</strong> {esp.disponibilidade}</p>
                </div>
                <div className="especialista-acoes">
                  <button 
                    onClick={() => agendarConsulta(esp)}
                    className="btn-agendar"
                  >
                    📅 Agendar
                  </button>
                  <button 
                    onClick={() => contatarEspecialista(esp)}
                    className="btn-contatar"
                  >
                    📞 Contatar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dicas de Saúde */}
      <div className="secao-dicas">
        <h2>💡 Dicas de Saúde</h2>
        <div className="dicas-grid">
          <div className="dica-card">
            <span className="dica-icone">🏃‍♂️</span>
            <h3>Exercícios Regulares</h3>
            <p>Pratique pelo menos 150 minutos de atividade física moderada por semana.</p>
          </div>
          <div className="dica-card">
            <span className="dica-icone">🥗</span>
            <h3>Alimentação Balanceada</h3>
            <p>Mantenha uma dieta rica em frutas, vegetais e grãos integrais.</p>
          </div>
          <div className="dica-card">
            <span className="dica-icone">💤</span>
            <h3>Sono Adequado</h3>
            <p>Durma entre 7-9 horas por noite para recuperação adequada.</p>
          </div>
          <div className="dica-card">
            <span className="dica-icone">🧘‍♀️</span>
            <h3>Gerenciamento do Estresse</h3>
            <p>Pratique técnicas de relaxamento e mindfulness regularmente.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecomendacoesMedicas;
