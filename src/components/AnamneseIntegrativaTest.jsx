import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnamneseIntegrativa.css';

const AnamneseIntegrativaTest = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    genero: '',
    queixaPrincipal: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('anamneseData', JSON.stringify(formData));
    alert('Anamnese salva com sucesso!');
    navigate('/');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Dados Pessoais</h2>
            <div className="form-group">
              <label>Nome Completo:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Idade:</label>
              <input
                type="number"
                name="idade"
                value={formData.idade}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Gênero:</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h2>Queixa Principal</h2>
            <div className="form-group">
              <label>Descreva sua queixa principal:</label>
              <textarea
                name="queixaPrincipal"
                value={formData.queixaPrincipal}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
          </div>
        );
      default:
        return (
          <div className="step-content">
            <h2>Etapa {currentStep}</h2>
            <p>Conteúdo da etapa {currentStep}</p>
          </div>
        );
    }
  };

  return (
    <div className="anamnese-container">
      <div className="anamnese-form">
        <div className="step-header">
          <h1>Anamnese Integrativa</h1>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
          <div className="step-info">
            <span>Etapa {currentStep} de {totalSteps}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {renderStep()}
          
          <div className="form-navigation">
            <button 
              type="button" 
              onClick={prevStep}
              disabled={currentStep === 1}
              className="btn-previous"
            >
              Anterior
            </button>
            
            {currentStep < totalSteps ? (
              <button 
                type="button" 
                onClick={nextStep}
                className="btn-next"
              >
                Próximo
              </button>
            ) : (
              <button 
                type="submit"
                className="btn-submit"
              >
                Finalizar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AnamneseIntegrativaTest;
