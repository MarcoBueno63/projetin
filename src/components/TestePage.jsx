import React from 'react';

export default function TestePage() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f2f5',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h1 style={{color: '#2d3748', marginBottom: '20px'}}>
          🎉 HealthSystem Funcionando!
        </h1>
        <p style={{color: '#718096', marginBottom: '30px'}}>
          O servidor está rodando corretamente em localhost:3000
        </p>
        <div style={{
          display: 'flex',
          gap: '15px',
          justifyContent: 'center'
        }}>
          <a 
            href="/login" 
            style={{
              padding: '12px 24px',
              backgroundColor: '#667eea',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            Ir para Login
          </a>
          <a 
            href="/menu" 
            style={{
              padding: '12px 24px',
              backgroundColor: '#48bb78',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '8px',
              fontWeight: '600'
            }}
          >
            Ir para Menu
          </a>
        </div>
      </div>
    </div>
  );
}
