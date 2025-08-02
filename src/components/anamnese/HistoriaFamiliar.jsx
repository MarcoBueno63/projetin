import React from 'react';
import './anamnese-modules.css';

const HistoriaFamiliar = ({ formData, handleChange }) => {
  return (
    <div className="step-content">
      <h2>História Familiar</h2>
      
      <div className="form-group">
        <label>História Familiar de Doenças:</label>
        <textarea
          name="historiaFamiliar"
          value={formData.historiaFamiliar || ''}
          onChange={handleChange}
          rows="4"
          placeholder="Doenças dos pais, irmãos, avós (paternos e maternos). Ex: Pai - hipertensão, Mãe - diabetes..."
        />
      </div>
      
      <div className="form-group">
        <label>Doenças Hereditárias/Genéticas:</label>
        <textarea
          name="doencasHereditarias"
          value={formData.doencasHereditarias || ''}
          onChange={handleChange}
          rows="3"
          placeholder="Diabetes, hipertensão, câncer, doenças cardíacas, mentais, etc..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Casos de Câncer na Família:</label>
          <textarea
            name="historicoCancer"
            value={formData.historicoCancer || ''}
            onChange={handleChange}
            rows="2"
            placeholder="Tipo de câncer, parentesco, idade ao diagnóstico..."
          />
        </div>
        
        <div className="form-group">
          <label>Doenças Cardiovasculares:</label>
          <textarea
            name="historicoCardiovascular"
            value={formData.historicoCardiovascular || ''}
            onChange={handleChange}
            rows="2"
            placeholder="Infarto, derrame, arritmias, parentesco, idade..."
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Diabetes na Família:</label>
          <select
            name="familiaDiabetes"
            value={formData.familiaDiabetes || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nao">Não há casos</option>
            <option value="pais">Pais</option>
            <option value="irmaos">Irmãos</option>
            <option value="avos">Avós</option>
            <option value="multiplos">Múltiplos familiares</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Hipertensão na Família:</label>
          <select
            name="familiaHipertensao"
            value={formData.familiaHipertensao || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nao">Não há casos</option>
            <option value="pais">Pais</option>
            <option value="irmaos">Irmãos</option>
            <option value="avos">Avós</option>
            <option value="multiplos">Múltiplos familiares</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Outras Informações Familiares Relevantes:</label>
        <textarea
          name="outrasInformacoesFamiliares"
          value={formData.outrasInformacoesFamiliares || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Doenças mentais, malformações congênitas, outras condições relevantes..."
        />
      </div>
    </div>
  );
};

export default HistoriaFamiliar;
