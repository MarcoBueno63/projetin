import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnamneseIntegrativa.css';

const AnamneseIntegrativa = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 6;
  
  const [formData, setFormData] = useState({
    // Etapa 1 - Dados pessoais
    nome: '',
    idade: '',
    genero: '',
    profissao: '',
    estadoCivil: '',
    endereco: '',
    telefone: '',
    email: '',
    
    // Etapa 2 - Queixa principal
    queixaPrincipal: '',
    inicioSintomas: '',
    evolucao: '',
    fatoresAlivio: '',
    fatoresPiora: '',
    intensidadeDor: '',
    
    // Etapa 3 - História médica
    medicamentosAtuais: '',
    alergias: '',
    cirurgiasPrevias: '',
    hospitalizacoes: '',
    doencasAnteriores: '',
    
    // Etapa 4 - História familiar
    historiaFamiliar: '',
    doencasHereditarias: '',
    
    // Etapa 5 - Hábitos de vida
    tabagismo: '',
    alcoolismo: '',
    atividade_fisica: '',
    alimentacao: '',
    sono: '',
    stress: '',
    
    // Etapa 6 - Revisão de sistemas + específicos por gênero
    sistemaCardiovascular: '',
    sistemaRespiratorio: '',
    sistemaDigestivo: '',
    sistemaGeniturinario: '',
    sistemaNeurologico: '',
    sistemaMusculoesqueletico: '',
    
    // Específico feminino
    cicloMenstrual: '',
    dataUltimaMenstruacao: '',
    gravidezAnterior: '',
    partos: '',
    abortos: '',
    menopausa: '',
    terapiaHormonal: '',
    contraceptivos: '',
    
    // Específico masculino
    problemasProstaticos: '',
    disfuncaoEretil: '',
    alteracoesUrinarias: '',
    
    // Observações
    observacoes: ''
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
            <div className="form-row">
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
            <div className="form-row">
              <div className="form-group">
                <label>Profissão:</label>
                <input
                  type="text"
                  name="profissao"
                  value={formData.profissao}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Estado Civil:</label>
                <select
                  name="estadoCivil"
                  value={formData.estadoCivil}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a)</option>
                  <option value="divorciado">Divorciado(a)</option>
                  <option value="viuvo">Viúvo(a)</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Endereço:</label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Telefone:</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        );
      
      case 2:
        return (
          <div className="step-content">
            <h2>Queixa Principal</h2>
            <div className="form-group">
              <label>Queixa Principal:</label>
              <textarea
                name="queixaPrincipal"
                value={formData.queixaPrincipal}
                onChange={handleChange}
                rows="4"
                placeholder="Descreva o motivo da consulta..."
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Início dos Sintomas:</label>
                <input
                  type="text"
                  name="inicioSintomas"
                  value={formData.inicioSintomas}
                  onChange={handleChange}
                  placeholder="Ex: há 2 semanas"
                />
              </div>
              <div className="form-group">
                <label>Evolução:</label>
                <select
                  name="evolucao"
                  value={formData.evolucao}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="melhorou">Melhorou</option>
                  <option value="piorou">Piorou</option>
                  <option value="estavel">Estável</option>
                  <option value="intermitente">Intermitente</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Fatores de Alívio:</label>
                <input
                  type="text"
                  name="fatoresAlivio"
                  value={formData.fatoresAlivio}
                  onChange={handleChange}
                  placeholder="O que melhora os sintomas?"
                />
              </div>
              <div className="form-group">
                <label>Fatores de Piora:</label>
                <input
                  type="text"
                  name="fatoresPiora"
                  value={formData.fatoresPiora}
                  onChange={handleChange}
                  placeholder="O que piora os sintomas?"
                />
              </div>
            </div>
            <div className="form-group">
              <label>Intensidade da Dor (se aplicável):</label>
              <select
                name="intensidadeDor"
                value={formData.intensidadeDor}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="1">1 - Muito leve</option>
                <option value="2">2 - Leve</option>
                <option value="3">3 - Moderada</option>
                <option value="4">4 - Intensa</option>
                <option value="5">5 - Muito intensa</option>
              </select>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="step-content">
            <h2>História Médica</h2>
            <div className="form-group">
              <label>Medicamentos Atuais:</label>
              <textarea
                name="medicamentosAtuais"
                value={formData.medicamentosAtuais}
                onChange={handleChange}
                rows="3"
                placeholder="Liste todos os medicamentos em uso..."
              />
            </div>
            <div className="form-group">
              <label>Alergias:</label>
              <textarea
                name="alergias"
                value={formData.alergias}
                onChange={handleChange}
                rows="2"
                placeholder="Alergias a medicamentos, alimentos, etc..."
              />
            </div>
            <div className="form-group">
              <label>Cirurgias Prévias:</label>
              <textarea
                name="cirurgiasPrevias"
                value={formData.cirurgiasPrevias}
                onChange={handleChange}
                rows="2"
                placeholder="Cirurgias realizadas e datas..."
              />
            </div>
            <div className="form-group">
              <label>Hospitalizações:</label>
              <textarea
                name="hospitalizacoes"
                value={formData.hospitalizacoes}
                onChange={handleChange}
                rows="2"
                placeholder="Internações hospitalares..."
              />
            </div>
            <div className="form-group">
              <label>Doenças Anteriores:</label>
              <textarea
                name="doencasAnteriores"
                value={formData.doencasAnteriores}
                onChange={handleChange}
                rows="3"
                placeholder="Doenças já diagnosticadas..."
              />
            </div>
          </div>
        );
      
      case 4:
        return (
          <div className="step-content">
            <h2>História Familiar</h2>
            <div className="form-group">
              <label>História Familiar:</label>
              <textarea
                name="historiaFamiliar"
                value={formData.historiaFamiliar}
                onChange={handleChange}
                rows="4"
                placeholder="Doenças dos pais, irmãos, avós..."
              />
            </div>
            <div className="form-group">
              <label>Doenças Hereditárias:</label>
              <textarea
                name="doencasHereditarias"
                value={formData.doencasHereditarias}
                onChange={handleChange}
                rows="3"
                placeholder="Diabetes, hipertensão, câncer, etc..."
              />
            </div>
          </div>
        );
      
      case 5:
        return (
          <div className="step-content">
            <h2>Hábitos de Vida</h2>
            <div className="form-row">
              <div className="form-group">
                <label>Tabagismo:</label>
                <select
                  name="tabagismo"
                  value={formData.tabagismo}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="nunca">Nunca fumou</option>
                  <option value="ex-fumante">Ex-fumante</option>
                  <option value="fumante">Fumante atual</option>
                </select>
              </div>
              <div className="form-group">
                <label>Alcoolismo:</label>
                <select
                  name="alcoolismo"
                  value={formData.alcoolismo}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  <option value="nunca">Nunca bebe</option>
                  <option value="social">Social</option>
                  <option value="frequente">Frequente</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Atividade Física:</label>
              <textarea
                name="atividade_fisica"
                value={formData.atividade_fisica}
                onChange={handleChange}
                rows="2"
                placeholder="Tipo e frequência de exercícios..."
              />
            </div>
            <div className="form-group">
              <label>Alimentação:</label>
              <textarea
                name="alimentacao"
                value={formData.alimentacao}
                onChange={handleChange}
                rows="2"
                placeholder="Hábitos alimentares..."
              />
            </div>
            <div className="form-group">
              <label>Sono:</label>
              <textarea
                name="sono"
                value={formData.sono}
                onChange={handleChange}
                rows="2"
                placeholder="Qualidade do sono, horários..."
              />
            </div>
            <div className="form-group">
              <label>Nível de Stress:</label>
              <select
                name="stress"
                value={formData.stress}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="baixo">Baixo</option>
                <option value="moderado">Moderado</option>
                <option value="alto">Alto</option>
              </select>
            </div>
          </div>
        );
      
      case 6:
        return (
          <div className="step-content">
            <h2>Revisão de Sistemas</h2>
            <div className="form-group">
              <label>Sistema Cardiovascular:</label>
              <textarea
                name="sistemaCardiovascular"
                value={formData.sistemaCardiovascular}
                onChange={handleChange}
                rows="2"
                placeholder="Dor no peito, palpitações, falta de ar..."
              />
            </div>
            <div className="form-group">
              <label>Sistema Respiratório:</label>
              <textarea
                name="sistemaRespiratorio"
                value={formData.sistemaRespiratorio}
                onChange={handleChange}
                rows="2"
                placeholder="Tosse, falta de ar, chiado..."
              />
            </div>
            <div className="form-group">
              <label>Sistema Digestivo:</label>
              <textarea
                name="sistemaDigestivo"
                value={formData.sistemaDigestivo}
                onChange={handleChange}
                rows="2"
                placeholder="Dor abdominal, náusea, vômitos..."
              />
            </div>
            <div className="form-group">
              <label>Sistema Geniturinário:</label>
              <textarea
                name="sistemaGeniturinario"
                value={formData.sistemaGeniturinario}
                onChange={handleChange}
                rows="2"
                placeholder="Alterações urinárias..."
              />
            </div>
            <div className="form-group">
              <label>Sistema Neurológico:</label>
              <textarea
                name="sistemaNeurologico"
                value={formData.sistemaNeurologico}
                onChange={handleChange}
                rows="2"
                placeholder="Dor de cabeça, tontura, formigamento..."
              />
            </div>
            <div className="form-group">
              <label>Sistema Musculoesquelético:</label>
              <textarea
                name="sistemaMusculoesqueletico"
                value={formData.sistemaMusculoesqueletico}
                onChange={handleChange}
                rows="2"
                placeholder="Dores articulares, musculares..."
              />
            </div>
            
            {/* Seção específica por gênero */}
            {formData.genero === 'feminino' && (
              <div className="gender-specific">
                <h3>Questões Específicas - Feminino</h3>
                <div className="form-row">
                  <div className="form-group">
                    <label>Ciclo Menstrual:</label>
                    <input
                      type="text"
                      name="cicloMenstrual"
                      value={formData.cicloMenstrual}
                      onChange={handleChange}
                      placeholder="Ex: Regular, 28 dias"
                    />
                  </div>
                  <div className="form-group">
                    <label>Data da Última Menstruação:</label>
                    <input
                      type="date"
                      name="dataUltimaMenstruacao"
                      value={formData.dataUltimaMenstruacao}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Gravidez Anterior:</label>
                    <select
                      name="gravidezAnterior"
                      value={formData.gravidezAnterior}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Número de Partos:</label>
                    <input
                      type="number"
                      name="partos"
                      value={formData.partos}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Número de Abortos:</label>
                    <input
                      type="number"
                      name="abortos"
                      value={formData.abortos}
                      onChange={handleChange}
                      min="0"
                    />
                  </div>
                  <div className="form-group">
                    <label>Menopausa:</label>
                    <select
                      name="menopausa"
                      value={formData.menopausa}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Terapia Hormonal:</label>
                    <select
                      name="terapiaHormonal"
                      value={formData.terapiaHormonal}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Uso de Contraceptivos:</label>
                    <select
                      name="contraceptivos"
                      value={formData.contraceptivos}
                      onChange={handleChange}
                    >
                      <option value="">Selecione</option>
                      <option value="sim">Sim</option>
                      <option value="nao">Não</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
            
            {formData.genero === 'masculino' && (
              <div className="gender-specific">
                <h3>Questões Específicas - Masculino</h3>
                <div className="form-group">
                  <label>Problemas Prostáticos:</label>
                  <textarea
                    name="problemasProstaticos"
                    value={formData.problemasProstaticos}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Dificuldade urinária, dor, etc..."
                  />
                </div>
                <div className="form-group">
                  <label>Disfunção Erétil:</label>
                  <select
                    name="disfuncaoEretil"
                    value={formData.disfuncaoEretil}
                    onChange={handleChange}
                  >
                    <option value="">Selecione</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                    <option value="ocasional">Ocasional</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Alterações Urinárias:</label>
                  <textarea
                    name="alteracoesUrinarias"
                    value={formData.alteracoesUrinarias}
                    onChange={handleChange}
                    rows="2"
                    placeholder="Urgência, frequência, noctúria..."
                  />
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label>Observações Gerais:</label>
              <textarea
                name="observacoes"
                value={formData.observacoes}
                onChange={handleChange}
                rows="3"
                placeholder="Outras informações relevantes..."
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getStepTitle = (step) => {
    const titles = {
      1: 'Dados Pessoais',
      2: 'Queixa Principal',
      3: 'História Médica',
      4: 'História Familiar',
      5: 'Hábitos de Vida',
      6: 'Revisão de Sistemas'
    };
    return titles[step] || '';
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.nome && formData.idade && formData.genero;
      case 2:
        return formData.queixaPrincipal;
      default:
        return true;
    }
  };

  return (
    <div className="anamnese-container">
      <div className="anamnese-form">
        <div className="step-header">
          <h1>Anamnese Integrativa</h1>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
          <div className="step-info">
            <span className="step-number">Etapa {currentStep} de {totalSteps}</span>
            <span className="step-title">{getStepTitle(currentStep)}</span>
          </div>
        </div>

        <form>
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
                disabled={!isStepValid()}
                className="btn-next"
              >
                Próximo
              </button>
            ) : (
              <button 
                type="submit"
                onClick={handleSubmit}
                disabled={!isStepValid()}
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

export default AnamneseIntegrativa;
