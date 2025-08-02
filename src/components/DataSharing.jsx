import React, { useState, useEffect } from 'react';
import { UserService, SharingService, NotificationService } from '../services/userService';
import './DataSharing.css';

export default function DataSharing() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [dataToShare, setDataToShare] = useState({
    tipo: '',
    dados: null
  });
  const [availableData, setAvailableData] = useState([]);
  const [sharedWithMe, setSharedWithMe] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Carregar usuário atual
    const user = UserService.getUsuarioLogado();
    if (user) {
      setCurrentUser(user);
      loadAvailableData();
      loadSharedData();
      loadUsers();
    }
  }, []);

  const loadUsers = () => {
    // Carregar lista de usuários registrados
    const registeredUsers = UserService.listarUsuarios();
    const currentUser = UserService.getUsuarioLogado();
    
    // Filtrar o usuário atual da lista
    const otherUsers = registeredUsers.filter(user => user.email !== currentUser?.email);
    setUsers(otherUsers);
  };

  const loadAvailableData = () => {
    // Carregar dados disponíveis para compartilhar
    const consultasKey = `consultas_${currentUser?.email}`;
    const examesKey = `exames_${currentUser?.email}`;
    const anamneseKey = `anamnese_${currentUser?.email}`;
    const prescricoesKey = `prescricoes_${currentUser?.email}`;

    const data = [];
    
    const consultas = JSON.parse(localStorage.getItem(consultasKey) || '[]');
    if (consultas.length > 0) {
      data.push({ tipo: 'consultas', label: 'Consultas Médicas', count: consultas.length, dados: consultas });
    }

    const exames = JSON.parse(localStorage.getItem(examesKey) || '[]');
    if (exames.length > 0) {
      data.push({ tipo: 'exames', label: 'Exames Médicos', count: exames.length, dados: exames });
    }

    const anamnese = JSON.parse(localStorage.getItem(anamneseKey) || '[]');
    if (anamnese.length > 0) {
      data.push({ tipo: 'anamnese', label: 'Anamnese', count: anamnese.length, dados: anamnese });
    }

    const prescricoes = JSON.parse(localStorage.getItem(prescricoesKey) || '[]');
    if (prescricoes.length > 0) {
      data.push({ tipo: 'prescricoes', label: 'Prescrições', count: prescricoes.length, dados: prescricoes });
    }

    setAvailableData(data);
  };

  const loadSharedData = () => {
    // Carregar dados compartilhados comigo
    const shared = SharingService.getDadosCompartilhadosComigo(currentUser?.email);
    setSharedWithMe(shared);
  };

  const handleShare = async () => {
    if (!selectedUser || !dataToShare.tipo) {
      setMessage('Selecione um usuário e o tipo de dados para compartilhar');
      return;
    }

    setLoading(true);
    
    try {
      const selectedData = availableData.find(data => data.tipo === dataToShare.tipo);
      
      const resultado = SharingService.compartilharDados({
        remetente: currentUser.email,
        destinatario: selectedUser,
        tipo: dataToShare.tipo,
        dados: selectedData.dados,
        dataCompartilhamento: new Date().toISOString(),
        label: selectedData.label
      });

      if (resultado.sucesso) {
        // Enviar notificação
        NotificationService.enviarNotificacao(selectedUser, {
          tipo: 'compartilhamento',
          titulo: 'Novos dados compartilhados',
          mensagem: `${currentUser.nome} compartilhou ${selectedData.label} com você`,
          remetente: currentUser.email,
          data: new Date().toISOString()
        });

        setMessage('Dados compartilhados com sucesso!');
        setSelectedUser('');
        setDataToShare({ tipo: '', dados: null });
      } else {
        setMessage(resultado.mensagem);
      }
    } catch (error) {
      setMessage('Erro ao compartilhar dados');
    }

    setLoading(false);
  };

  const handleAcceptSharedData = (sharedItem) => {
    // Aceitar dados compartilhados
    const resultado = SharingService.aceitarDadosCompartilhados(sharedItem.id, currentUser.email);
    
    if (resultado.sucesso) {
      setMessage('Dados aceitos e importados com sucesso!');
      loadSharedData();
    } else {
      setMessage(resultado.mensagem);
    }
  };

  const handleRejectSharedData = (sharedItem) => {
    // Rejeitar dados compartilhados
    const resultado = SharingService.rejeitarDadosCompartilhados(sharedItem.id);
    
    if (resultado.sucesso) {
      setMessage('Dados rejeitados');
      loadSharedData();
    } else {
      setMessage(resultado.mensagem);
    }
  };

  if (!currentUser) {
    return (
      <div className="data-sharing-container">
        <div className="error-message">
          Você precisa estar logado para acessar o compartilhamento de dados.
        </div>
      </div>
    );
  }

  return (
    <div className="data-sharing-container">
      <div className="sharing-header">
        <h1>🔗 Compartilhamento de Dados</h1>
        <p>Compartilhe seus dados médicos com outros usuários do sistema</p>
      </div>

      {message && (
        <div className="message-alert">
          {message}
        </div>
      )}

      <div className="sharing-content">
        {/* Seção de Compartilhar Dados */}
        <div className="share-section">
          <h2>📤 Compartilhar Meus Dados</h2>
          
          <div className="form-group">
            <label>Selecionar Usuário:</label>
            <select 
              value={selectedUser} 
              onChange={(e) => setSelectedUser(e.target.value)}
              disabled={loading}
            >
              <option value="">Escolha um usuário...</option>
              {users.map(user => (
                <option key={user.email} value={user.email}>
                  {user.nome} ({user.tipo}) - {user.email}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Tipo de Dados:</label>
            <select 
              value={dataToShare.tipo} 
              onChange={(e) => setDataToShare({ ...dataToShare, tipo: e.target.value })}
              disabled={loading}
            >
              <option value="">Escolha o tipo de dados...</option>
              {availableData.map(data => (
                <option key={data.tipo} value={data.tipo}>
                  {data.label} ({data.count} registros)
                </option>
              ))}
            </select>
          </div>

          <button 
            onClick={handleShare} 
            disabled={loading || !selectedUser || !dataToShare.tipo}
            className="share-button"
          >
            {loading ? 'Compartilhando...' : 'Compartilhar Dados'}
          </button>

          {availableData.length === 0 && (
            <div className="no-data-message">
              Você ainda não possui dados para compartilhar. 
              Crie alguns registros primeiro.
            </div>
          )}
        </div>

        {/* Seção de Dados Compartilhados Comigo */}
        <div className="received-section">
          <h2>📥 Dados Compartilhados Comigo</h2>
          
          {sharedWithMe.length === 0 ? (
            <div className="no-shared-data">
              Nenhum dado foi compartilhado com você ainda.
            </div>
          ) : (
            <div className="shared-items">
              {sharedWithMe.map(item => (
                <div key={item.id} className="shared-item">
                  <div className="shared-info">
                    <h3>{item.label}</h3>
                    <p>De: {item.remetente}</p>
                    <p>Data: {new Date(item.dataCompartilhamento).toLocaleDateString()}</p>
                    <p>{item.dados?.length || 0} registros</p>
                  </div>
                  
                  <div className="shared-actions">
                    <button 
                      onClick={() => handleAcceptSharedData(item)}
                      className="accept-button"
                    >
                      ✅ Aceitar
                    </button>
                    <button 
                      onClick={() => handleRejectSharedData(item)}
                      className="reject-button"
                    >
                      ❌ Rejeitar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
