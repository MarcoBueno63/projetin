import React from 'react';

function AnamneseFormSimple() {
  return (
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#f5f5f5', 
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center' 
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '600px'
      }}>
        <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '1.5rem' }}>
          Anamnese Médica
        </h2>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Nome:
            </label>
            <input 
              type="text" 
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Idade:
            </label>
            <input 
              type="number" 
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>
          <button 
            type="submit" 
            style={{
              backgroundColor: '#007bff',
              color: 'white',
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              cursor: 'pointer',
              width: '100%'
            }}
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AnamneseFormSimple;
