import React from 'react';
import './anamnese-modules.css';

const RevisaoSistemas = ({ formData, handleChange }) => {
  return (
    <div className="step-content">
      <h2>Revisão de Sistemas</h2>
      
      <div className="form-group">
        <label>Sistema Cardiovascular:</label>
        <textarea
          name="sistemaCardiovascular"
          value={formData.sistemaCardiovascular || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Dor no peito, palpitações, falta de ar, inchaço nas pernas, tonturas..."
        />
      </div>
      
      <div className="form-group">
        <label>Sistema Respiratório:</label>
        <textarea
          name="sistemaRespiratorio"
          value={formData.sistemaRespiratorio || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Tosse, falta de ar, chiado, catarro, dor para respirar..."
        />
      </div>
      
      <div className="form-group">
        <label>Sistema Digestivo:</label>
        <textarea
          name="sistemaDigestivo"
          value={formData.sistemaDigestivo || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Dor abdominal, náusea, vômitos, diarreia, constipação, azia..."
        />
      </div>
      
      <div className="form-group">
        <label>Sistema Geniturinário:</label>
        <textarea
          name="sistemaGeniturinario"
          value={formData.sistemaGeniturinario || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Alterações urinárias, dor ao urinar, sangue na urina, frequência..."
        />
      </div>
      
      <div className="form-group">
        <label>Sistema Neurológico:</label>
        <textarea
          name="sistemaNeurologico"
          value={formData.sistemaNeurologico || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Dor de cabeça, tontura, formigamento, fraqueza, convulsões, alterações de memória..."
        />
      </div>
      
      <div className="form-group">
        <label>Sistema Musculoesquelético:</label>
        <textarea
          name="sistemaMusculoesqueletico"
          value={formData.sistemaMusculoesqueletico || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Dores articulares, musculares, rigidez, limitação de movimento..."
        />
      </div>
      
      <div className="form-group">
        <label>Pele e Anexos:</label>
        <textarea
          name="sistemaPele"
          value={formData.sistemaPele || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Manchas, lesões, coceira, alterações em unhas, cabelo..."
        />
      </div>
      
      <div className="form-group">
        <label>Sistema Endócrino:</label>
        <textarea
          name="sistemaEndocrino"
          value={formData.sistemaEndocrino || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Alterações de peso, sede excessiva, suor excessivo, intolerância ao calor/frio..."
        />
      </div>
      
      <div className="form-group">
        <label>Observações Gerais:</label>
        <textarea
          name="observacoesGerais"
          value={formData.observacoesGerais || ''}
          onChange={handleChange}
          rows="3"
          placeholder="Outras informações relevantes que não se encaixam nas categorias acima..."
        />
      </div>
    </div>
  );
};

export default RevisaoSistemas;
