import React from 'react';
import './anamnese-modules.css';

const QuestoesMasculinas = ({ formData, handleChange }) => {
  return (
    <div className="gender-specific masculino">
      <h3>🔷 Questões Específicas - Masculino</h3>
      
      <div className="form-group">
        <label>Problemas Prostáticos:</label>
        <select
          name="problemasProstaticos"
          value={formData.problemasProstaticos || ''}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="nao">Não</option>
          <option value="hiperplasia">Hiperplasia Benigna (HPB)</option>
          <option value="prostatite">Prostatite</option>
          <option value="cancer">Câncer de Próstata</option>
          <option value="outros">Outros problemas</option>
          <option value="investigacao">Em investigação</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Sintomas Urinários:</label>
        <textarea
          name="sintomasUrinarios"
          value={formData.sintomasUrinarios || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Dificuldade para urinar, jato fraco, gotejamento, urgência, frequência..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Disfunção Erétil:</label>
          <select
            name="disfuncaoEretil"
            value={formData.disfuncaoEretil || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nao">Não</option>
            <option value="leve">Leve/Ocasional</option>
            <option value="moderada">Moderada</option>
            <option value="severa">Severa/Completa</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Alterações na Libido:</label>
          <select
            name="alteracoesLibido"
            value={formData.alteracoesLibido || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="normal">Normal</option>
            <option value="diminuida">Diminuída</option>
            <option value="aumentada">Aumentada</option>
            <option value="ausente">Ausente</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Problemas de Ejaculação:</label>
        <select
          name="problemasEjaculacao"
          value={formData.problemasEjaculacao || ''}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="nao">Não</option>
          <option value="precoce">Ejaculação Precoce</option>
          <option value="retardada">Ejaculação Retardada</option>
          <option value="ausente">Ausência de Ejaculação</option>
          <option value="retrograda">Ejaculação Retrógrada</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Últimos Exames da Próstata:</label>
        <textarea
          name="examesProstata"
          value={formData.examesProstata || ''}
          onChange={handleChange}
          rows="2"
          placeholder="PSA, toque retal, ultrassom, biópsia - datas e resultados..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Valor do Último PSA:</label>
          <input
            type="number"
            step="0.01"
            name="ultimoPSA"
            value={formData.ultimoPSA || ''}
            onChange={handleChange}
            placeholder="Ex: 1.5"
          />
        </div>
        
        <div className="form-group">
          <label>Data do Último PSA:</label>
          <input
            type="date"
            name="dataUltimoPSA"
            value={formData.dataUltimoPSA || ''}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Sintomas Noturnos:</label>
        <textarea
          name="sintomasNoturnos"
          value={formData.sintomasNoturnos || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Noctúria (acordar para urinar), quantas vezes por noite..."
        />
      </div>
      
      <div className="form-group">
        <label>Autoexame Testicular:</label>
        <select
          name="autoexameTesticular"
          value={formData.autoexameTesticular || ''}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="regular">Faço regularmente</option>
          <option value="ocasional">Faço ocasionalmente</option>
          <option value="nunca">Nunca faço</option>
          <option value="nao-sei">Não sei como fazer</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Alterações nos Testículos:</label>
        <textarea
          name="alteracoesTesticulos"
          value={formData.alteracoesTesticulos || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Dor, inchaço, nódulos, varicocele, outras alterações..."
        />
      </div>
      
      <div className="form-group">
        <label>Histórico de Vasectomia:</label>
        <select
          name="vasectomia"
          value={formData.vasectomia || ''}
          onChange={handleChange}
        >
          <option value="">Selecione</option>
          <option value="nao">Não</option>
          <option value="sim">Sim</option>
          <option value="planejando">Planejando fazer</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Outras Questões Urológicas:</label>
        <textarea
          name="outrasQuestoesUrologicas"
          value={formData.outrasQuestoesUrologicas || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Infecções urinárias, pedras nos rins, outros problemas..."
        />
      </div>
    </div>
  );
};

export default QuestoesMasculinas;
