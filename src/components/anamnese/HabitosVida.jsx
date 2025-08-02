import React from 'react';
import './anamnese-modules.css';

const HabitosVida = ({ formData, handleChange }) => {
  return (
    <div className="step-content">
      <h2>Hábitos de Vida</h2>
      
      <div className="form-row">
        <div className="form-group">
          <label>Tabagismo:</label>
          <select
            name="tabagismo"
            value={formData.tabagismo || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nunca">Nunca fumou</option>
            <option value="ex-fumante">Ex-fumante</option>
            <option value="fumante">Fumante atual</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Consumo de Álcool:</label>
          <select
            name="alcoolismo"
            value={formData.alcoolismo || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nunca">Nunca bebe</option>
            <option value="social">Social (ocasional)</option>
            <option value="regular">Regular (semanal)</option>
            <option value="frequente">Frequente (diário)</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Detalhes sobre Tabaco/Álcool:</label>
        <textarea
          name="detalhesTabacoAlcool"
          value={formData.detalhesTabacoAlcool || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Quantidade, frequência, há quanto tempo parou (se ex-fumante)..."
        />
      </div>
      
      <div className="form-group">
        <label>Atividade Física:</label>
        <textarea
          name="atividadeFisica"
          value={formData.atividadeFisica || ''}
          onChange={handleChange}
          rows="3"
          placeholder="Tipo de exercício, frequência semanal, duração, intensidade..."
        />
      </div>
      
      <div className="form-group">
        <label>Hábitos Alimentares:</label>
        <textarea
          name="alimentacao"
          value={formData.alimentacao || ''}
          onChange={handleChange}
          rows="3"
          placeholder="Padrão alimentar, restrições, alergias alimentares, preferências..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Qualidade do Sono:</label>
          <select
            name="qualidadeSono"
            value={formData.qualidadeSono || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="otima">Ótima</option>
            <option value="boa">Boa</option>
            <option value="regular">Regular</option>
            <option value="ruim">Ruim</option>
            <option value="pessima">Péssima</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Horas de Sono por Noite:</label>
          <input
            type="number"
            name="horasSono"
            value={formData.horasSono || ''}
            onChange={handleChange}
            min="1"
            max="12"
            placeholder="Ex: 8"
          />
        </div>
      </div>
      
      <div className="form-group">
        <label>Padrão do Sono:</label>
        <textarea
          name="padraoSono"
          value={formData.padraoSono || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Horário de dormir e acordar, insônia, sonolência diurna, ronco..."
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Nível de Estresse:</label>
          <select
            name="stress"
            value={formData.stress || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="baixo">Baixo</option>
            <option value="moderado">Moderado</option>
            <option value="alto">Alto</option>
            <option value="muito-alto">Muito Alto</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Uso de Drogas Ilícitas:</label>
          <select
            name="drogasIlicitas"
            value={formData.drogasIlicitas || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="nunca">Nunca</option>
            <option value="ocasional">Uso ocasional</option>
            <option value="regular">Uso regular</option>
            <option value="ex-usuario">Ex-usuário</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Fatores de Estresse/Observações sobre Estilo de Vida:</label>
        <textarea
          name="fatoresEstresse"
          value={formData.fatoresEstresse || ''}
          onChange={handleChange}
          rows="2"
          placeholder="Trabalho, família, financeiro, saúde. Como lida com o estresse..."
        />
      </div>
    </div>
  );
};

export default HabitosVida;
