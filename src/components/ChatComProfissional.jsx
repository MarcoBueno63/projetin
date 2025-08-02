import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ChatComProfissional.css';

export default function ChatComProfissional() {
  const { id } = useParams(); // ID do profissional
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [profissionalNome] = useState("Dr. Silva"); // Removido setProfissionalNome não utilizado
  
  // Simular ID do paciente (em produção virá do Firebase Auth)
  const pacienteId = "paciente-123";

  useEffect(() => {
    // Simular carregamento de mensagens do localStorage
    const chatKey = `chat-${pacienteId}-${id}`;
    const mensagensSalvas = JSON.parse(localStorage.getItem(chatKey)) || [];
    setMensagens(mensagensSalvas);
  }, [id, pacienteId]);

  const enviarMensagem = () => {
    if (!mensagem.trim()) return;

    const novaMensagem = {
      id: Date.now(),
      texto: mensagem,
      remetente: "paciente",
      data: new Date().toISOString(),
      profissionalId: id,
      pacienteId: pacienteId
    };

    const novasMensagens = [...mensagens, novaMensagem];
    setMensagens(novasMensagens);

    // Salvar no localStorage
    const chatKey = `chat-${pacienteId}-${id}`;
    localStorage.setItem(chatKey, JSON.stringify(novasMensagens));

    setMensagem("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enviarMensagem();
    }
  };

  return (
    <div className="chat-paciente-container">
      <div className="chat-paciente-header">
        <button onClick={() => navigate('/dashboard')} className="back-button">
          ← Voltar
        </button>
        <h2>💬 Chat com {profissionalNome}</h2>
      </div>

      <div className="chat-paciente-content">
        <div className="messages-container">
          {mensagens.length === 0 ? (
            <div className="no-messages">
              <p>Nenhuma mensagem ainda. Aguarde o profissional entrar em contato!</p>
            </div>
          ) : (
            mensagens.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.remetente === 'paciente' ? 'message-sent' : 'message-received'}`}
              >
                <div className="message-content">
                  <p>{msg.texto}</p>
                  <small className="message-time">
                    {new Date(msg.data).toLocaleString('pt-BR')}
                  </small>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="message-input-container">
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="message-input"
          />
          <button onClick={enviarMensagem} className="send-button">
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
