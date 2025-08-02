import React from 'react';

const StatusProgresso = () => {
  const anamneseConcluida = localStorage.getItem('anamneseConcluida') === 'true';
  const examesUpload = localStorage.getItem('examesUpload') === 'true';
  
  const steps = [
    {
      id: 'anamnese',
      titulo: '1. Anamnese',
      descricao: 'Complete o questionário médico',
      concluido: anamneseConcluida,
      icone: '📋'
    },
    {
      id: 'exames',
      titulo: '2. Upload de Exames',
      descricao: 'Envie seus exames médicos',
      concluido: examesUpload,
      habilitado: anamneseConcluida,
      icone: '📊'
    },
    {
      id: 'analise',
      titulo: '3. Análise IA',
      descricao: 'Solicite análise inteligente',
      concluido: false,
      habilitado: anamneseConcluida && examesUpload,
      icone: '🤖'
    }
  ];

  return (
    <div style={{ 
      background: '#f8f9fa', 
      padding: '20px', 
      borderRadius: '8px', 
      margin: '20px 0',
      border: '1px solid #e9ecef'
    }}>
      <h3 style={{ margin: '0 0 15px 0', color: '#495057' }}>
        📈 Seu Progresso no Sistema
      </h3>
      
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
        {steps.map((step, index) => (
          <div
            key={step.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 15px',
              borderRadius: '6px',
              background: step.concluido ? '#d4edda' : 
                         step.habilitado ? '#fff3cd' : '#f8d7da',
              border: `1px solid ${
                step.concluido ? '#c3e6cb' : 
                step.habilitado ? '#ffeaa7' : '#f5c6cb'
              }`,
              color: step.concluido ? '#155724' : 
                     step.habilitado ? '#856404' : '#721c24',
              flex: '1',
              minWidth: '200px'
            }}
          >
            <span style={{ fontSize: '20px', marginRight: '10px' }}>
              {step.concluido ? '✅' : step.habilitado ? step.icone : '🔒'}
            </span>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '14px' }}>
                {step.titulo}
              </div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>
                {step.concluido ? 'Concluído' : 
                 step.habilitado ? step.descricao : 'Bloqueado'}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '15px', fontSize: '12px', color: '#6c757d' }}>
        💡 Complete cada etapa em ordem para desbloquear a próxima
      </div>
    </div>
  );
};

export default StatusProgresso;
