import React from 'react';

const TesteSimples = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Teste Simples Funcionando!</h1>
      <p>Se você vê esta mensagem, o React está funcionando corretamente.</p>
      <p>Data e hora atual: {new Date().toLocaleString()}</p>
    </div>
  );
};

export default TesteSimples;
