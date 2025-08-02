import React, { useState, useEffect } from 'react';

const TesteAutoSave = () => {
  const [testData, setTestData] = useState('');
  const [savedData, setSavedData] = useState('');

  // Carregar dados salvos ao inicializar
  useEffect(() => {
    const saved = localStorage.getItem('testeAutoSave');
    if (saved) {
      setSavedData(saved);
    }
  }, []);

  // Auto-save quando testData mudar
  useEffect(() => {
    if (testData) {
      localStorage.setItem('testeAutoSave', testData);
      setSavedData(testData);
    }
  }, [testData]);

  const limparDados = () => {
    localStorage.removeItem('testeAutoSave');
    setTestData('');
    setSavedData('');
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>🧪 Teste de Auto-Save</h3>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Digite algo para testar o auto-save:</label>
        <input
          type="text"
          value={testData}
          onChange={(e) => setTestData(e.target.value)}
          placeholder="Digite aqui..."
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
      </div>

      <div style={{ marginBottom: '15px' }}>
        <strong>Dados salvos no localStorage:</strong>
        <div style={{ padding: '8px', background: '#f0f0f0', borderRadius: '4px' }}>
          {savedData || 'Nenhum dado salvo'}
        </div>
      </div>

      <button onClick={limparDados} style={{ padding: '8px 16px' }}>
        Limpar Dados
      </button>

      <div style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>
        ℹ️ Abra o console (F12) para ver os logs do auto-save
      </div>
    </div>
  );
};

export default TesteAutoSave;
