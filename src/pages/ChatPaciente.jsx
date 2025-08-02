import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './ChatPaciente.css';

export default function ChatPaciente() {
  const { id } = useParams(); // ID do paciente
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const [pacienteNome, setPacienteNome] = useState("");
  
  // Simular ID do profissional (em produção virá do Firebase Auth)
  const profissionalId = "prof-123";

  useEffect(() => {
    // Simular carregamento de mensagens do localStorage
    const chatKey = `chat-${id}-${profissionalId}`;
    const mensagensSalvas = JSON.parse(localStorage.getItem(chatKey)) || [];
    setMensagens(mensagensSalvas);

    // Pegar nome do paciente
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
    const paciente = pacientes[parseInt(id)];
    if (paciente) {
      setPacienteNome(paciente.nome);
    }
  }, [id, profissionalId]);

  const enviarMensagem = () => {
    if (!mensagem.trim()) return;

    const novaMensagem = {
      id: Date.now(),
      texto: mensagem,
      remetente: "profissional",
      data: new Date().toISOString(),
      profissionalId: profissionalId,
      pacienteId: id
    };

    const novasMensagens = [...mensagens, novaMensagem];
    setMensagens(novasMensagens);

    // Salvar no localStorage
    const chatKey = `chat-${id}-${profissionalId}`;
    localStorage.setItem(chatKey, JSON.stringify(novasMensagens));

    setMensagem("");
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      enviarMensagem();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button onClick={() => navigate('/admin/dashboard')} className="back-button">
          ← Voltar
        </button>
        <h2>💬 Chat com {pacienteNome}</h2>
      </div>

      <div className="chat-content">
        <div className="messages-container">
          {mensagens.length === 0 ? (
            <div className="no-messages">
              <p>Nenhuma mensagem ainda. Inicie a conversa!</p>
            </div>
          ) : (
            mensagens.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.remetente === 'profissional' ? 'message-sent' : 'message-received'}`}
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
