import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnamneseForm.css';

export default function AnamneseForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: '',
    idade: '',
    genero: '',
    sintomas: '',
    temHipertensao: false,
    medicamentosHipertensao: '',
    historicoFamiliar: '',
    atividadeFisica: ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    // Salva os dados no localStorage
    localStorage.setItem('anamnese', JSON.stringify(form));

    navigate('/exames');
  };

  return (
    <div className="anamnese-container">
      <div className="anamnese-form">
        <h2>Formulário de Anamnese</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="nome" 
              placeholder="Nome completo" 
              value={form.nome} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <input 
              type="number" 
              name="idade" 
              placeholder="Idade" 
              value={form.idade} 
              onChange={handleChange} 
              required 
            />
          </div>

          <div className="form-group">
            <select name="genero" value={form.genero} onChange={handleChange} required>
              <option value="">Selecione o Gênero</option>
              <option value="feminino">Feminino</option>
              <option value="masculino">Masculino</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="form-group">
            <textarea 
              name="sintomas" 
              placeholder="Descreva seus sintomas principais" 
              value={form.sintomas} 
              onChange={handleChange} 
              rows={4}
            ></textarea>
          </div>

          <div className="form-group checkbox-group">
            <label>
              <input 
                type="checkbox" 
                name="temHipertensao" 
                checked={form.temHipertensao} 
                onChange={handleChange} 
              />
              Tenho hipertensão
            </label>
          </div>

          {form.temHipertensao && (
            <div className="form-group">
              <input 
                type="text" 
                name="medicamentosHipertensao" 
                placeholder="Medicamentos usados" 
                value={form.medicamentosHipertensao} 
                onChange={handleChange} 
              />
            </div>
          )}

          <div className="form-group">
            <textarea 
              name="historicoFamiliar" 
              placeholder="Histórico de doenças na família" 
              value={form.historicoFamiliar} 
              onChange={handleChange} 
              rows={3}
            ></textarea>
          </div>

          <div className="form-group">
            <select name="atividadeFisica" value={form.atividadeFisica} onChange={handleChange}>
              <option value="">Pratica atividade física?</option>
              <option value="nunca">Nunca</option>
              <option value="às vezes">Às vezes</option>
              <option value="regularmente">Regularmente</option>
            </select>
          </div>

          <button type="submit">Próximo: Enviar exames</button>
        </form>
      </div>
    </div>
  );
}
