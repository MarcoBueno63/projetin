import React from 'react';
import './anamnese-modules.css';

const HistoriaMedica = ({ formData, handleChange }) => {
  return (
    <div className="step-content">
      <h2>História Médica</h2>
      
      <div className="form-group">
        <label>Medicamentos em Uso Atual:</label>
        <textarea
          name="medicamentosAtuais"
          value={formData.medicamentosAtuais || ''}
          onChange={handleChange}
          rows="3"
          placeholder="Liste todos os medicamentos, doses, frequência e há quanto tempo usa..."
        />
      </div>
      
      <div className="form-group">
        <label>Alergias Conhecidas:</label>
        <textarea
          name="alergias"
          value={formData.alergias || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Medicamentos, alimentos, substâncias. Descreva as reações..."
        />
      </div>
      
      <div className="form-group">
        <label>Cirurgias Realizadas:</label>
        <textarea
          name="cirurgiasPrevias"
          value={formData.cirurgiasPrevias || ''}
          onChange={handleChange}
          rows="3"
          placeholder="Tipo de cirurgia, data/ano, local onde foi realizada, complicações..."
        />
      </div>
      
      <div className="form-group">
        <label>Internações Hospitalares:</label>
        <textarea
          name="hospitalizacoes"
          value={formData.hospitalizacoes || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Motivo, data/ano, duração, hospital..."
        />
      </div>
      
      <div className="form-group">
        <label>Doenças Anteriores/Diagnósticos Prévios:</label>
        <textarea
          name="doencasAnteriores"
          value={formData.doencasAnteriores || ''}
          onChange={handleChange}
          rows="3"
          placeholder="Hipertensão, diabetes, depressão, etc. Quando foi diagnosticado, tratamento..."
        />
      </div>
      
      <div className="form-group">
        <label>Exames Recentes Relevantes:</label>
        <textarea
          name="examesRecentes"
          value={formData.examesRecentes || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Exames de sangue, imagem, resultados importantes dos últimos 6 meses..."
        />
      </div>
      
      <div className="form-group">
        <label>Vacinas em Dia:</label>
        <select
          name="vacinasEmDia"
          value={formData.vacinasEmDia || ''}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="sim">Sim, todas em dia</option>
          <option value="parcial">Parcialmente em dia</option>
          <option value="nao">Não estão em dia</option>
          <option value="nao-sei">Não sei informar</option>
        </select>
      </div>
    </div>
  );
};

export default HistoriaMedica;
