import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { exportarDadosPacientesParaExcel, exportarAgendamentosParaExcel } from '../services/excelService';
import './DashboardEstatisticas.css';

export default function DashboardEstatisticas() {
  const navigate = useNavigate();
  const [estatisticas, setEstatisticas] = useState({
    totalPacientes: 0,
    statusData: [],
    generoData: [],
    agendamentosData: []
  });
  const [mensagemExport, setMensagemExport] = useState('');

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = () => {
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];

    // Estatísticas de status
    const statusCount = pacientes.reduce((acc, paciente) => {
      const status = paciente.status || 'Em acompanhamento';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const statusData = Object.entries(statusCount).map(([name, value]) => ({
      name,
      value
    }));

    // Estatísticas de gênero
    const generoCount = pacientes.reduce((acc, paciente) => {
      const genero = paciente.genero || 'Não informado';
      acc[genero] = (acc[genero] || 0) + 1;
      return acc;
    }, {});

    const generoData = Object.entries(generoCount).map(([name, value]) => ({
      name,
      value
    }));

    // Estatísticas de agendamentos por mês
    const agendamentosPorMes = agendamentos.reduce((acc, agendamento) => {
      const mes = new Date(agendamento.dataHora).toLocaleDateString('pt-BR', { month: 'long' });
      acc[mes] = (acc[mes] || 0) + 1;
      return acc;
    }, {});

    const agendamentosData = Object.entries(agendamentosPorMes).map(([name, value]) => ({
      name,
      value
    }));

    setEstatisticas({
      totalPacientes: pacientes.length,
      statusData,
      generoData,
      agendamentosData
    });
  };

  const exportarPacientes = () => {
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const resultado = exportarDadosPacientesParaExcel(pacientes);
    setMensagemExport(resultado.mensagem);
    
    setTimeout(() => {
      setMensagemExport('');
    }, 3000);
  };

  const exportarAgendamentos = () => {
    const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
    const resultado = exportarAgendamentosParaExcel(agendamentos);
    setMensagemExport(resultado.mensagem);
    
    setTimeout(() => {
      setMensagemExport('');
    }, 3000);
  };

  const gerarRelatorioCompleto = () => {
    window.print();
  };

  const coresStatus = {
    'Alta': '#28a745',
    'Encaminhado': '#007bff',
    'Observação': '#ffc107',
    'Em acompanhamento': '#6c757d'
  };

  const coresGenero = {
    'masculino': '#007bff',
    'feminino': '#e83e8c',
    'outro': '#6f42c1'
  };

  const getCorStatus = (status) => coresStatus[status] || '#6c757d';
  const getCorGenero = (genero) => coresGenero[genero] || '#6c757d';

  return (
    <div className="dashboard-estatisticas">
      <div className="dashboard-header">
        <button onClick={() => navigate('/admin/dashboard')} className="back-button">
          ← Voltar
        </button>
        <h2>📊 Dashboard de Estatísticas</h2>
      </div>

      <div className="stats-cards">
        <div className="stat-card">
          <h3>👥 Total de Pacientes</h3>
          <div className="stat-number">{estatisticas.totalPacientes}</div>
        </div>

        <div className="stat-card">
          <h3>📅 Agendamentos</h3>
          <div className="stat-number">{estatisticas.agendamentosData.reduce((acc, item) => acc + item.value, 0)}</div>
        </div>

        <div className="stat-card">
          <h3>🩺 Em Acompanhamento</h3>
          <div className="stat-number">
            {estatisticas.statusData.find(item => item.name === 'Em acompanhamento')?.value || 0}
          </div>
        </div>

        <div className="stat-card">
          <h3>✅ Altas</h3>
          <div className="stat-number">
            {estatisticas.statusData.find(item => item.name === 'Alta')?.value || 0}
          </div>
        </div>
      </div>

      <div className="charts-container">
        <div className="chart-section">
          <h3>Status dos Pacientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={estatisticas.statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {estatisticas.statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getCorStatus(entry.name)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section">
          <h3>Distribuição por Gênero</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={estatisticas.generoData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {estatisticas.generoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getCorGenero(entry.name)} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-section full-width">
          <h3>Agendamentos por Período</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={estatisticas.agendamentosData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#007bff" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="actions-section">
        <button onClick={() => navigate('/admin/dashboard')} className="action-btn">
          👥 Ver Pacientes
        </button>
        <button onClick={gerarRelatorioCompleto} className="action-btn">
          � Exportar PDF
        </button>
        <button onClick={exportarPacientes} className="action-btn">
          � Exportar Pacientes Excel
        </button>
        <button onClick={exportarAgendamentos} className="action-btn">
          � Exportar Agendamentos Excel
        </button>
        <button onClick={carregarEstatisticas} className="action-btn">
          � Atualizar Dados
        </button>
      </div>

      {mensagemExport && <div className="export-message">{mensagemExport}</div>}
    </div>
  );
}
