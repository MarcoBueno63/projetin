import React from 'react';
import './anamnese-modules.css';

const QueixaPrincipal = ({ formData, handleChange }) => {
  return (
    <div className="step-content">
      <h2>Queixa Principal</h2>
      
      <div className="form-group">
        <label>Queixa Principal:</label>
        <textarea
          name="queixaPrincipal"
          value={formData.queixaPrincipal || ''}
          onChange={handleChange}
          rows="4"
          placeholder="Descreva detalhadamente o motivo da consulta, sintomas principais..."
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Início dos Sintomas:</label>
          <input
            type="text"
            name="inicioSintomas"
            value={formData.inicioSintomas || ''}
            onChange={handleChange}
            placeholder="Ex: há 2 semanas, desde janeiro..."
          />
        </div>
        
        <div className="form-group">
          <label>Evolução dos Sintomas:</label>
          <select
            name="evolucao"
            value={formData.evolucao || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="melhorou">Melhorou</option>
            <option value="piorou">Piorou</option>
            <option value="estavel">Estável/Inalterado</option>
            <option value="intermitente">Intermitente</option>
            <option value="progressivo">Progressivo</option>
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Fatores de Alívio:</label>
          <textarea
            name="fatoresAlivio"
            value={formData.fatoresAlivio || ''}
            onChange={handleChange}
            rows="2"
            placeholder="O que melhora os sintomas? Medicamentos, repouso, posições..."
          />
        </div>
        
        <div className="form-group">
          <label>Fatores de Piora:</label>
          <textarea
            name="fatoresPiora"
            value={formData.fatoresPiora || ''}
            onChange={handleChange}
            rows="2"
            placeholder="O que piora os sintomas? Movimento, estresse, alimentos..."
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Intensidade da Dor/Desconforto (escala 0-10):</label>
        <select
          name="intensidadeDor"
          value={formData.intensidadeDor || ''}
          onChange={handleChange}
        >
          <option value="">Selecione (se aplicável)</option>
          <option value="0">0 - Sem dor</option>
          <option value="1-2">1-2 - Muito leve</option>
          <option value="3-4">3-4 - Leve</option>
          <option value="5-6">5-6 - Moderada</option>
          <option value="7-8">7-8 - Intensa</option>
          <option value="9-10">9-10 - Muito intensa/Insuportável</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Características da Dor/Sintoma:</label>
        <textarea
          name="caracteristicasDor"
          value={formData.caracteristicasDor || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Ex: queimação, pontada, latejante, cólica, formigamento..."
        />
      </div>
    </div>
  );
};

export default QueixaPrincipal;
