import React from 'react';
import './anamnese-modules.css';

const QuestoesFemininas = ({ formData, handleChange }) => {
  return (
    <div className="gender-specific feminino">
      <h3>🌸 Questões Específicas - Feminino</h3>
      
      <div className="form-row">
        <div className="form-group">
          <label>Ciclo Menstrual:</label>
          <select
            name="cicloMenstrual"
            value={formData.cicloMenstrual || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="regular">Regular</option>
            <option value="irregular">Irregular</option>
            <option value="ausente">Ausente</option>
            <option value="menopausa">Menopausa</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Idade da Primeira Menstruação (Menarca):</label>
          <input
            type="number"
            name="idadeMenarca"
            value={formData.idadeMenarca || ''}
            onChange={handleChange}
            min="8"
            max="18"
            placeholder="Ex: 12"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Data da Última Menstruação:</label>
          <input
            type="date"
            name="dataUltimaMenstruacao"
            value={formData.dataUltimaMenstruacao || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="form-group">
          <label>Duração do Ciclo (dias):</label>
          <input
            type="number"
            name="duracaoCiclo"
            value={formData.duracaoCiclo || ''}
            onChange={handleChange}
            min="21"
            max="40"
            placeholder="Ex: 28"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Características da Menstruação:</label>
        <textarea
          name="caracteristicasMenstruacao"
          value={formData.caracteristicasMenstruacao || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Fluxo (leve/moderado/intenso), duração, cólicas, coágulos..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Já engravidou:</label>
          <select
            name="jaEngravidou"
            value={formData.jaEngravidou || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="sim">Sim</option>
            <option value="nao">Não</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Número de Gestações:</label>
          <input
            type="number"
            name="numeroGestacoes"
            value={formData.numeroGestacoes || ''}
            onChange={handleChange}
            min="0"
            placeholder="Total de gestações"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Partos:</label>
          <input
            type="number"
            name="partos"
            value={formData.partos || ''}
            onChange={handleChange}
            min="0"
            placeholder="Número de partos"
          />
        </div>
        
        <div className="form-group">
          <label>Abortos:</label>
          <input
            type="number"
            name="abortos"
            value={formData.abortos || ''}
            onChange={handleChange}
            min="0"
            placeholder="Número de abortos"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Tipo de Partos:</label>
        <textarea
          name="tipoPartos"
          value={formData.tipoPartos || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Normal, cesária, fórceps. Complicações durante a gestação ou parto..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Menopausa:</label>
          <select
            name="menopausa"
            value={formData.menopausa || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nao">Não</option>
            <option value="sim">Sim</option>
            <option value="perimenopausa">Pré-menopausa</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Idade da Menopausa:</label>
          <input
            type="number"
            name="idadeMenopausa"
            value={formData.idadeMenopausa || ''}
            onChange={handleChange}
            min="35"
            max="65"
            placeholder="Se aplicável"
          />
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Terapia de Reposição Hormonal:</label>
          <select
            name="terapiaHormonal"
            value={formData.terapiaHormonal || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nao">Não</option>
            <option value="sim-atual">Sim, atualmente</option>
            <option value="sim-passado">Sim, no passado</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Método Contraceptivo Atual:</label>
          <select
            name="metodoContraceptivo"
            value={formData.metodoContraceptivo || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nenhum">Nenhum</option>
            <option value="pilula">Pílula anticoncepcional</option>
            <option value="diu">DIU</option>
            <option value="preservativo">Preservativo</option>
            <option value="injecao">Injeção</option>
            <option value="adesivo">Adesivo</option>
            <option value="anel">Anel vaginal</option>
            <option value="implante">Implante</option>
            <option value="laqueadura">Laqueadura</option>
            <option value="outros">Outros</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Exames Ginecológicos:</label>
        <textarea
          name="examesGinecologicos"
          value={formData.examesGinecologicos || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Último Papanicolau, mamografia, ultrassom transvaginal, datas e resultados..."
        />
      </div>
      
      <div className="form-group">
        <label>Sintomas Relacionados ao Ciclo:</label>
        <textarea
          name="sintomasCiclo"
          value={formData.sintomasCiclo || ''}
          onChange={handleChange}
          rows="2"
          placeholder="TPM, alterações de humor, dor nas mamas, retenção de líquido..."
        />
      </div>
    </div>
  );
};

export default QuestoesFemininas;
