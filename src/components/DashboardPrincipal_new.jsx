import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import './DashboardPrincipal.css';

export default function DashboardPrincipal() {
  const navigate = useNavigate();
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [estatisticas, setEstatisticas] = useState({
    consultas: 0,
    examesTotais: 0,
    medicosDisponiveis: 0,
    mensagensChat: 0
  });
  const [agendamentosRecentes, setAgendamentosRecentes] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    carregarDadosUsuario();
    carregarEstatisticas();
    carregarAgendamentos();
    carregarNotificacoes();
  }, []);

  const carregarDadosUsuario = () => {
    const anamnese = JSON.parse(localStorage.getItem('anamnese'));
    const anamneseIntegrativa = JSON.parse(localStorage.getItem('anamneseIntegrativa'));
    
    if (anamneseIntegrativa) {
      setDadosUsuario({
        nome: anamneseIntegrativa.nome,
        idade: anamneseIntegrativa.idade,
        genero: anamneseIntegrativa.genero,
        ultimaConsulta: new Date().toISOString()
      });
    } else if (anamnese) {
      setDadosUsuario({
        nome: anamnese.nome,
        idade: anamnese.idade,
        genero: anamnese.genero,
        ultimaConsulta: anamnese.dataAnamnese
      });
    }
  };

  const carregarEstatisticas = () => {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const exames = JSON.parse(localStorage.getItem('exames')) || [];
    const medicos = JSON.parse(localStorage.getItem('medicos')) || [];
    const mensagens = JSON.parse(localStorage.getItem('mensagens')) || [];

    setEstatisticas({
      consultas: agendamentos.length,
      examesTotais: exames.length,
      medicosDisponiveis: medicos.length || 8,
      mensagensChat: mensagens.length
    });
  };

  const carregarAgendamentos = () => {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const recentes = agendamentos
      .sort((a, b) => new Date(b.dataAgendamento) - new Date(a.dataAgendamento))
      .slice(0, 5);
    setAgendamentosRecentes(recentes);
  };

  const carregarNotificacoes = () => {
    const notifs = [
      {
        id: 1,
        tipo: 'consulta',
        titulo: 'Consulta Agendada',
        mensagem: 'Sua consulta está agendada para amanhã às 14:00',
        data: new Date(),
        lida: false
      },
      {
        id: 2,
        tipo: 'exame',
        titulo: 'Resultado de Exame',
        mensagem: 'Resultado do exame de sangue disponível',
        data: new Date(),
        lida: false
      },
      {
        id: 3,
        tipo: 'medicamento',
        titulo: 'Medicamento',
        mensagem: 'Lembrete: Tomar medicamento às 08:00',
        data: new Date(),
        lida: true
      }
    ];
    setNotificacoes(notifs);
  };

  const navegarPara = (rota) => {
    navigate(rota);
  };

  const acoesRapidas = [
    { titulo: 'Anamnese Integrativa', descricao: 'Questionário completo de saúde', icone: '📋', rota: '/anamnese-integrativa', cor: '#667eea' },
    { titulo: 'Agendar Consulta', descricao: 'Marcar nova consulta médica', icone: '📅', rota: '/agendar', cor: '#11998e' },
    { titulo: 'Chat Médico', descricao: 'Conversar com profissionais', icone: '💬', rota: '/chat', cor: '#f093fb' },
    { titulo: 'Upload Exames', descricao: 'Enviar resultados de exames', icone: '📊', rota: '/exames', cor: '#4facfe' },
    { titulo: 'Medicamentos', descricao: 'Gerenciar medicamentos', icone: '💊', rota: '/medicamentos', cor: '#ffeaa7' },
    { titulo: 'Histórico', descricao: 'Ver histórico médico', icone: '📖', rota: '/historico', cor: '#fd79a8' },
    { titulo: 'Fornecedores', descricao: 'Gerenciar fornecedores de suplementos', icone: '🧴', rota: '/admin-fornecedor', cor: '#ffb347' }
  ];

  const dadosGraficoPie = [
    { name: 'Consultas', value: estatisticas.consultas || 1, color: '#667eea' },
    { name: 'Exames', value: estatisticas.examesTotais || 1, color: '#11998e' },
    { name: 'Medicamentos', value: 5, color: '#f093fb' },
    { name: 'Mensagens', value: estatisticas.mensagensChat || 1, color: '#4facfe' }
  ];

  const logout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  const renderHeader = () => (
    <div className="dashboard-header">
      <div className="header-content">
        <div className="user-info">
          <h1>Bem-vindo, {dadosUsuario?.nome || 'Usuário'}!</h1>
          <p>Acompanhe sua saúde de forma inteligente</p>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate('/admin')} className="admin-btn">
            🔧 Admin
          </button>
          <button onClick={logout} className="logout-btn">
            🚪 Sair
          </button>
        </div>
      </div>
    </div>
  );

  const renderEstatisticas = () => (
    <div className="estatisticas-grid">
      <div className="stat-card">
        <div className="stat-icon">📅</div>
        <div className="stat-info">
          <h3>Consultas</h3>
          <p className="stat-number">{estatisticas.consultas}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🔬</div>
        <div className="stat-info">
          <h3>Exames</h3>
          <p className="stat-number">{estatisticas.examesTotais}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">👨‍⚕️</div>
        <div className="stat-info">
          <h3>Médicos</h3>
          <p className="stat-number">{estatisticas.medicosDisponiveis}</p>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">💬</div>
        <div className="stat-info">
          <h3>Mensagens</h3>
          <p className="stat-number">{estatisticas.mensagensChat}</p>
        </div>
      </div>
    </div>
  );

  const renderAcoesRapidas = () => (
    <div className="acoes-rapidas">
      <h2>Ações Rápidas</h2>
      <div className="acoes-grid">
        {acoesRapidas.map((acao, index) => (
          <div 
            key={index} 
            className="acao-card"
            onClick={() => navegarPara(acao.rota)}
            style={{ borderLeft: `4px solid ${acao.cor}` }}
          >
            <div className="acao-icon" style={{ color: acao.cor }}>
              {acao.icone}
            </div>
            <div className="acao-info">
              <h3>{acao.titulo}</h3>
              <p>{acao.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderGraficos = () => (
    <div className="graficos-section">
      <div className="grafico-card">
        <h3>Distribuição de Atividades</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={dadosGraficoPie}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {dadosGraficoPie.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grafico-card">
        <h3>Atividades Mensais</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dadosGraficoPie}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#667eea" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );

  const renderNotificacoes = () => (
    <div className="notificacoes-section">
      <h2>Notificações</h2>
      <div className="notificacoes-lista">
        {notificacoes.map(notif => (
          <div key={notif.id} className={`notificacao ${notif.lida ? 'lida' : 'nao-lida'}`}>
            <div className="notif-icon">
              {notif.tipo === 'consulta' && '📅'}
              {notif.tipo === 'exame' && '🔬'}
              {notif.tipo === 'medicamento' && '💊'}
            </div>
            <div className="notif-content">
              <h4>{notif.titulo}</h4>
              <p>{notif.mensagem}</p>
              <small>{new Date(notif.data).toLocaleDateString('pt-BR')}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAgendamentos = () => (
    <div className="agendamentos-section">
      <h2>Próximos Agendamentos</h2>
      <div className="agendamentos-lista">
        {agendamentosRecentes.length > 0 ? (
          agendamentosRecentes.map((agendamento, index) => (
            <div key={index} className="agendamento-item">
              <div className="agendamento-data">
                <span className="data">{new Date(agendamento.dataHora).toLocaleDateString('pt-BR')}</span>
                <span className="hora">{new Date(agendamento.dataHora).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="agendamento-info">
                <h4>{agendamento.especialidade}</h4>
                <p>Dr. {agendamento.medico}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="sem-agendamentos">
            <p>Nenhum agendamento próximo</p>
            <button onClick={() => navigate('/agendar')} className="btn-agendar">
              Agendar Consulta
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="dashboard-principal">
      {renderHeader()}
      
      <div className="dashboard-content">
        {renderEstatisticas()}
        
        <div className="dashboard-grid">
          <div className="grid-left">
            {renderAcoesRapidas()}
            {renderGraficos()}
          </div>
          
          <div className="grid-right">
            {renderNotificacoes()}
            {renderAgendamentos()}
          </div>
        </div>
      </div>
    </div>
  );
}
