import React from 'react';
import './anamnese-modules.css';

const DadosPessoais = ({ formData, handleChange }) => {
  return (
    <div className="step-content">
      <h2>Dados Pessoais</h2>
      
      <div className="form-group">
        <label>Nome Completo:</label>
        <input
          type="text"
          name="nome"
          value={formData.nome || ''}
          onChange={handleChange}
          placeholder="Digite seu nome completo"
          required
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Idade:</label>
          <input
            type="number"
            name="idade"
            value={formData.idade || ''}
            onChange={handleChange}
            placeholder="Ex: 35"
            min="1"
            max="120"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Gênero:</label>
          <select
            name="genero"
            value={formData.genero || ''}
            onChange={handleChange}
            required
          >
            <option value="">Selecione</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro</option>
          </select>
        </div>
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Profissão:</label>
          <input
            type="text"
            name="profissao"
            value={formData.profissao || ''}
            onChange={handleChange}
            placeholder="Ex: Professor, Engenheiro..."
          />
        </div>
        
        <div className="form-group">
          <label>Estado Civil:</label>
          <select
            name="estadoCivil"
            value={formData.estadoCivil || ''}
            onChange={handleChange}
          >
            <option value="">Selecione</option>
            <option value="solteiro">Solteiro(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="divorciado">Divorciado(a)</option>
            <option value="viuvo">Viúvo(a)</option>
            <option value="uniao-estavel">União Estável</option>
          </select>
        </div>
      </div>
      
      <div className="form-group">
        <label>Endereço Completo:</label>
        <input
          type="text"
          name="endereco"
          value={formData.endereco || ''}
          onChange={handleChange}
          placeholder="Rua, número, bairro, cidade, CEP"
        />
      </div>
      
      <div className="form-row">
        <div className="form-group">
          <label>Telefone:</label>
          <input
            type="tel"
            name="telefone"
            value={formData.telefone || ''}
            onChange={handleChange}
            placeholder="(11) 99999-9999"
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email || ''}
            onChange={handleChange}
            placeholder="exemplo@email.com"
          />
        </div>
      </div>
    </div>
  );
};

export default DadosPessoais;
