import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UploadExames.css';

export default function UploadExames() {
  const navigate = useNavigate();
  const [arquivos, setArquivos] = useState([]);
  const [examesesSalvos, setExamesesSalvos] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [anamneseConcluida, setAnamneseConcluida] = useState(false);

  useEffect(() => {
    try {
      // Verificar se anamnese foi concluída
      const anamneseStatus = localStorage.getItem('anamneseConcluida') === 'true';
      setAnamneseConcluida(anamneseStatus);
      
      if (!anamneseStatus) {
        // TODO: Adicionar feedback visual (Snackbar) para "Você precisa completar a anamnese antes de fazer upload dos exames."
        navigate('/anamnese-integrativa');
        return;
      }

      // Carregar exames salvos
      const savedExames = localStorage.getItem('exames');
      if (savedExames) {
        try {
          const exames = JSON.parse(savedExames);
          setExamesesSalvos(Array.isArray(exames) ? exames : []);
        } catch (parseError) {
          console.error('Erro ao carregar exames salvos:', parseError);
          setExamesesSalvos([]);
        }
      }
    } catch (error) {
      console.error('Erro no useEffect:', error);
      // TODO: Adicionar feedback visual (Snackbar) para "Erro ao carregar dados. Recarregando a página..."
      window.location.reload();
    }
  }, [navigate]);

  const handleFileChange = (e) => {
    const novosArquivos = Array.from(e.target.files);
    adicionarArquivos(novosArquivos);
  };

  const adicionarArquivos = (novosArquivos) => {
    try {
      // Filtrar apenas arquivos válidos
      const tiposPermitidos = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      const arquivosValidos = novosArquivos.filter(arquivo => {
        // Verificar tipo
        if (!tiposPermitidos.includes(arquivo.type)) {
          console.warn(`Arquivo ${arquivo.name} não é um tipo permitido`);
          return false;
        }
        
        // Verificar tamanho (máximo 10MB)
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (arquivo.size > maxSize) {
          console.warn(`Arquivo ${arquivo.name} é muito grande (máximo 10MB)`);
          // TODO: Adicionar feedback visual (Snackbar) para arquivo muito grande
          return false;
        }
        
        return true;
      });

      if (arquivosValidos.length > 0) {
        setArquivos(prev => [...prev, ...arquivosValidos]);
        // TODO: Adicionar feedback visual (Snackbar) para arquivos adicionados
      }
      
      if (arquivosValidos.length !== novosArquivos.length) {
        const rejeitados = novosArquivos.length - arquivosValidos.length;
        // TODO: Adicionar feedback visual (Snackbar) para arquivos rejeitados
      }
    } catch (error) {
      console.error('Erro ao adicionar arquivos:', error);
      // TODO: Adicionar feedback visual (Snackbar) para erro ao processar arquivos
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const novosArquivos = Array.from(e.dataTransfer.files);
      adicionarArquivos(novosArquivos);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (arquivos.length === 0) {
      // TODO: Adicionar feedback visual (Snackbar) para nenhum arquivo selecionado
      return;
    }

    try {
      setUploading(true);

      // Preparar dados dos exames
      const examesData = arquivos.map((arquivo, index) => ({
        id: Date.now() + index,
        nome: arquivo.name,
        tipo: arquivo.type,
        tamanho: arquivo.size,
        dataUpload: new Date().toISOString(),
        status: 'processando'
      }));

      // Salvar no localStorage
      const examesExistentes = JSON.parse(localStorage.getItem('exames') || '[]');
      const todosExames = [...examesExistentes, ...examesData];
      localStorage.setItem('exames', JSON.stringify(todosExames));

      // Marcar upload de exames como concluído para habilitar análise IA
      localStorage.setItem('examesUpload', 'true');
      localStorage.setItem('examesDataUpload', new Date().toISOString());

      // Usar setTimeout para simular processamento sem bloquear
      setTimeout(() => {
        setUploading(false);
        // TODO: Adicionar feedback visual (Snackbar) para exames enviados com sucesso
        navigate('/menu');
      }, 1500);

    } catch (error) {
      console.error('Erro no upload:', error);
      setUploading(false);
      // TODO: Adicionar feedback visual (Snackbar) para erro ao fazer upload dos exames
    }
  };

  const handleRemoverArquivo = (index) => {
    const novaLista = arquivos.filter((_, i) => i !== index);
    setArquivos(novaLista);
  };

  const formatarTamanho = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getIconeArquivo = (tipo) => {
    if (tipo === 'application/pdf') return '📄';
    if (tipo.startsWith('image/')) return '🖼️';
    return '📁';
  };

  return (
    <div className="upload-container">
      <div className="upload-header">
        <button 
          className="btn-voltar" 
          onClick={() => navigate('/menu')}
        >
          ← Voltar ao Menu
        </button>
        <h1>🔬 Importar Exames Médicos</h1>
      </div>

      <div className="upload-content">
        <div className="upload-section">
          <h2>Adicionar Novos Exames</h2>
          <form onSubmit={handleSubmit}>
            <div 
              className={`file-drop-zone ${dragActive ? 'active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="drop-zone-content">
                <div className="upload-icon">📁</div>
                <h3>Arraste e solte seus exames aqui</h3>
                <p>ou clique no botão abaixo para selecionar</p>
                <label className="file-input-label">
                  <input 
                    type="file" 
                    multiple 
                    accept=".pdf, .jpg, .jpeg, .png" 
                    onChange={handleFileChange} 
                    className="file-input"
                  />
                  Selecionar Arquivos
                </label>
                <p className="file-help">Aceita arquivos PDF, JPG e PNG até 10MB cada</p>
              </div>
            </div>

            {arquivos.length > 0 && (
              <div className="files-preview">
                <h4>Arquivos selecionados ({arquivos.length}):</h4>
                <div className="files-grid">
                  {arquivos.map((arquivo, index) => (
                    <div key={index} className="file-card">
                      <div className="file-info">
                        <span className="file-icon">{getIconeArquivo(arquivo.type)}</span>
                        <div className="file-details">
                          <span className="file-name">{arquivo.name}</span>
                          <span className="file-size">{formatarTamanho(arquivo.size)}</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        onClick={() => handleRemoverArquivo(index)}
                        className="remove-btn"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button 
              type="submit" 
              disabled={uploading}
              className="submit-btn"
            >
              {uploading ? (
                <>
                  <div className="spinner"></div>
                  Enviando...
                </>
              ) : (
                <>
                  🤖 Enviar para Análise IA
                </>
              )}
            </button>
          </form>
        </div>

        {examesesSalvos.length > 0 && (
          <div className="saved-exams-section">
            <h2>Exames Salvos ({examesesSalvos.length})</h2>
            <div className="saved-exams-grid">
              {examesesSalvos.map((exame, index) => (
                <div key={index} className="saved-exam-card">
                  <div className="exam-info">
                    <span className="exam-icon">{getIconeArquivo(exame.tipo || 'application/pdf')}</span>
                    <div className="exam-details">
                      <span className="exam-name">{exame.nome || exame}</span>
                      <span className="exam-date">
                        {exame.dataUpload ? new Date(exame.dataUpload).toLocaleDateString() : 'Data não informada'}
                      </span>
                    </div>
                  </div>
                  <div className="exam-status">
                    <span className={`status-badge ${exame.status || 'processado'}`}>
                      {exame.status === 'processando' ? 'Processando' : 'Processado'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
