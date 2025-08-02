import React, { useState, useEffect } from 'react';
import './NotificacoesSistema.css';

export default function NotificacoesSistema() {
  const [notificacoes, setNotificacoes] = useState([]);
  const [filtro, setFiltro] = useState('todas');

  useEffect(() => {
    carregarNotificacoes();
  }, []);

  const carregarNotificacoes = () => {
    // Simular notificações do sistema
    const notificacoesSimuladas = [
      {
        id: 1,
        tipo: 'medicamento',
        titulo: 'Hora do Medicamento',
        mensagem: 'Não esqueça de tomar Losartana 50mg às 08:00',
        data: new Date().toISOString(),
        lida: false,
        icone: '💊'
      },
      {
        id: 2,
        tipo: 'consulta',
        titulo: 'Consulta Agendada',
        mensagem: 'Consulta com Dr. Silva marcada para amanhã às 14:00',
        data: new Date(Date.now() - 86400000).toISOString(),
        lida: false,
        icone: '🩺'
      },
      {
        id: 3,
        tipo: 'exame',
        titulo: 'Resultado de Exame',
        mensagem: 'Resultado do hemograma disponível',
        data: new Date(Date.now() - 172800000).toISOString(),
        lida: true,
        icone: '📋'
      },
      {
        id: 4,
        tipo: 'sistema',
        titulo: 'Atualização Disponível',
        mensagem: 'Nova versão do aplicativo disponível',
        data: new Date(Date.now() - 259200000).toISOString(),
        lida: false,
        icone: '🔄'
      }
    ];

    setNotificacoes(notificacoesSimuladas);
  };

  const marcarComoLida = (id) => {
    setNotificacoes(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, lida: true } : notif
      )
    );
  };

  const marcarTodasComoLidas = () => {
    setNotificacoes(prev => 
      prev.map(notif => ({ ...notif, lida: true }))
    );
  };

  const excluirNotificacao = (id) => {
    setNotificacoes(prev => prev.filter(notif => notif.id !== id));
  };

  const notificacoesFiltradas = notificacoes.filter(notif => {
    if (filtro === 'todas') return true;
    if (filtro === 'nao-lidas') return !notif.lida;
    return notif.tipo === filtro;
  });

  const naoLidas = notificacoes.filter(n => !n.lida).length;

  return (
    <div className="notificacoes-container">
      <div className="notificacoes-header">
        <h1>🔔 Notificações</h1>
        <div className="notificacoes-stats">
          <span className="total-count">{notificacoes.length} total</span>
          {naoLidas > 0 && (
            <span className="unread-count">{naoLidas} não lidas</span>
          )}
        </div>
      </div>

      <div className="notificacoes-controls">
        <div className="filtros">
          <button 
            className={filtro === 'todas' ? 'active' : ''}
            onClick={() => setFiltro('todas')}
          >
            Todas
          </button>
          <button 
            className={filtro === 'nao-lidas' ? 'active' : ''}
            onClick={() => setFiltro('nao-lidas')}
          >
            Não Lidas
          </button>
          <button 
            className={filtro === 'medicamento' ? 'active' : ''}
            onClick={() => setFiltro('medicamento')}
          >
            Medicamentos
          </button>
          <button 
            className={filtro === 'consulta' ? 'active' : ''}
            onClick={() => setFiltro('consulta')}
          >
            Consultas
          </button>
          <button 
            className={filtro === 'exame' ? 'active' : ''}
            onClick={() => setFiltro('exame')}
          >
            Exames
          </button>
        </div>

        {naoLidas > 0 && (
          <button className="btn-marcar-todas" onClick={marcarTodasComoLidas}>
            Marcar todas como lidas
          </button>
        )}
      </div>

      <div className="notificacoes-lista">
        {notificacoesFiltradas.length === 0 ? (
          <div className="sem-notificacoes">
            <p>📭 Nenhuma notificação encontrada</p>
          </div>
        ) : (
          notificacoesFiltradas.map(notificacao => (
            <div 
              key={notificacao.id} 
              className={`notificacao-item ${!notificacao.lida ? 'nao-lida' : ''}`}
            >
              <div className="notificacao-icone">
                {notificacao.icone}
              </div>
              
              <div className="notificacao-conteudo">
                <h3>{notificacao.titulo}</h3>
                <p>{notificacao.mensagem}</p>
                <span className="data">
                  {new Date(notificacao.data).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>

              <div className="notificacao-acoes">
                {!notificacao.lida && (
                  <button 
                    className="btn-marcar-lida"
                    onClick={() => marcarComoLida(notificacao.id)}
                    title="Marcar como lida"
                  >
                    ✓
                  </button>
                )}
                <button 
                  className="btn-excluir"
                  onClick={() => excluirNotificacao(notificacao.id)}
                  title="Excluir notificação"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
