import React, { useState } from 'react';

const TesteGendero = () => {
  const [formData, setFormData] = useState({
    genero: '',
    cicloMenstrual: '',
    problemasProstaticos: ''
  });

  const getSafeValue = (value) => {
    return value || '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h2>🧪 Teste de Campos de Gênero</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Estado Atual dos Dados:</h3>
        <pre style={{ background: '#f5f5f5', padding: '10px', borderRadius: '5px' }}>
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Gênero:</label>
        <select 
          name="genero" 
          value={getSafeValue(formData.genero)}
          onChange={handleChange}
        >
          <option value="">Selecione...</option>
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
        </select>
      </div>

      {/* Seção Feminino */}
      {formData.genero && formData.genero === 'feminino' && (
        <div style={{ border: '2px solid pink', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
          <h4>🔸 Seção Feminino</h4>
          <div style={{ marginBottom: '10px' }}>
            <label>Ciclo Menstrual:</label>
            <select 
              name="cicloMenstrual" 
              value={getSafeValue(formData.cicloMenstrual)}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              <option value="regular">Regular</option>
              <option value="irregular">Irregular</option>
              <option value="ausente">Ausente</option>
            </select>
          </div>
        </div>
      )}

      {/* Seção Masculino */}
      {formData.genero && formData.genero === 'masculino' && (
        <div style={{ border: '2px solid lightblue', padding: '15px', marginBottom: '15px', borderRadius: '5px' }}>
          <h4>🔸 Seção Masculino</h4>
          <div style={{ marginBottom: '10px' }}>
            <label>Problemas Prostáticos:</label>
            <select 
              name="problemasProstaticos" 
              value={getSafeValue(formData.problemasProstaticos)}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              <option value="nao">Não</option>
              <option value="sim">Sim</option>
            </select>
          </div>
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '10px', background: '#e8f5e8', borderRadius: '5px' }}>
        <h4>✅ Status da Validação:</h4>
        <p><strong>Gênero definido:</strong> {formData.genero ? 'Sim' : 'Não'}</p>
        <p><strong>Gênero válido:</strong> {formData.genero && (formData.genero === 'feminino' || formData.genero === 'masculino') ? 'Sim' : 'Não'}</p>
        <p><strong>Seção renderizada:</strong> {
          formData.genero === 'feminino' ? 'Feminino' : 
          formData.genero === 'masculino' ? 'Masculino' : 
          'Nenhuma'
        }</p>
      </div>
    </div>
  );
};

export default TesteGendero;
