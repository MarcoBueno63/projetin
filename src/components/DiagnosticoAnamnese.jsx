import React, { useState, useEffect } from 'react';

const DiagnosticoAnamnese = () => {
  const [dadosLocalStorage, setDadosLocalStorage] = useState({});
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const verificarLocalStorage = () => {
      const dados = {
        anamneseFormData: localStorage.getItem('anamneseFormData'),
        anamneseCurrentStep: localStorage.getItem('anamneseCurrentStep'),
        anamneseBackup: localStorage.getItem('anamneseBackup'),
        usuario: localStorage.getItem('usuario')
      };
      
      setDadosLocalStorage(dados);
      
      // Log de verificação
      const timestamp = new Date().toLocaleTimeString();
      setLogs(prev => [...prev, `${timestamp}: Dados verificados`].slice(-10));
    };

    verificarLocalStorage();
    const interval = setInterval(verificarLocalStorage, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const limparDados = () => {
    localStorage.removeItem('anamneseFormData');
    localStorage.removeItem('anamneseCurrentStep');
    localStorage.removeItem('anamneseBackup');
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: Dados limpos`]);
  };

  const simularNavegacao = () => {
    const steps = [1, 2, 3, 4, 5, 6];
    steps.forEach((step, index) => {
      setTimeout(() => {
        localStorage.setItem('anamneseCurrentStep', step.toString());
        const formData = {
          nome: 'Teste',
          genero: 'masculino',
          step: step,
          timestamp: new Date().toISOString()
        };
        localStorage.setItem('anamneseFormData', JSON.stringify(formData));
        
        setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: Simulado step ${step}`].slice(-10));
      }, index * 1000);
    });
  };

  const parsearDados = (dados) => {
    if (!dados) return 'Null/Undefined';
    try {
      const parsed = JSON.parse(dados);
      return typeof parsed === 'object' ? `Objeto com ${Object.keys(parsed).length} chaves` : parsed;
    } catch {
      return dados;
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h2>🔍 Diagnóstico da Anamnese</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <button onClick={limparDados} style={{ marginRight: '10px', padding: '8px' }}>
          🗑️ Limpar Dados
        </button>
        <button onClick={simularNavegacao} style={{ padding: '8px' }}>
          🎬 Simular Navegação
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div>
          <h3>📊 Estado do LocalStorage</h3>
          <div style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
            <div style={{ marginBottom: '10px' }}>
              <strong>anamneseCurrentStep:</strong>
              <div style={{ color: dadosLocalStorage.anamneseCurrentStep ? 'green' : 'red' }}>
                {dadosLocalStorage.anamneseCurrentStep || 'Não definido'}
              </div>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>anamneseFormData:</strong>
              <div style={{ color: dadosLocalStorage.anamneseFormData ? 'green' : 'red' }}>
                {parsearDados(dadosLocalStorage.anamneseFormData)}
              </div>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <strong>anamneseBackup:</strong>
              <div style={{ color: dadosLocalStorage.anamneseBackup ? 'green' : 'red' }}>
                {parsearDados(dadosLocalStorage.anamneseBackup)}
              </div>
            </div>
            
            <div>
              <strong>usuario:</strong>
              <div style={{ color: dadosLocalStorage.usuario ? 'green' : 'red' }}>
                {parsearDados(dadosLocalStorage.usuario)}
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3>📝 Logs de Atividade</h3>
          <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px', height: '200px', overflow: 'auto' }}>
            {logs.map((log, index) => (
              <div key={index} style={{ fontSize: '12px', marginBottom: '5px' }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      {dadosLocalStorage.anamneseFormData && (
        <div style={{ marginTop: '20px' }}>
          <h3>🔍 Detalhes do FormData</h3>
          <pre style={{ background: '#f9f9f9', padding: '10px', borderRadius: '5px', overflow: 'auto', maxHeight: '300px' }}>
            {JSON.stringify(JSON.parse(dadosLocalStorage.anamneseFormData), null, 2)}
          </pre>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '10px', background: '#fff3cd', borderRadius: '5px' }}>
        <h4>🎯 Como Usar</h4>
        <ol>
          <li>Abra a Anamnese em outra aba</li>
          <li>Preencha alguns campos e navegue</li>
          <li>Volte aqui para ver os dados em tempo real</li>
          <li>Se houver problemas, os logs mostrarão</li>
          <li>Use "Simular Navegação" para testar automaticamente</li>
        </ol>
      </div>
    </div>
  );
};

export default DiagnosticoAnamnese;
