import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AnamneseIntegrativa.css';
// Importar módulos da anamnese
import DadosPessoais from './anamnese/DadosPessoais';
import QueixaPrincipal from './anamnese/QueixaPrincipal';
import HistoriaMedica from './anamnese/HistoriaMedica';
import HistoriaFamiliar from './anamnese/HistoriaFamiliar';
import HabitosVida from './anamnese/HabitosVida';
import RevisaoSistemas from './anamnese/RevisaoSistemas';
import QuestoesFemininas from './anamnese/QuestoesFemininas';
import QuestoesMasculinas from './anamnese/QuestoesMasculinas';

const AnamneseIntegrativa = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Função para carregar dados salvos do localStorage
  const loadSavedData = () => {
    try {
      const savedData = localStorage.getItem('anamneseFormData');
      const savedStep = localStorage.getItem('anamneseCurrentStep');
      
      if (savedData && savedStep) {
        return {
          data: JSON.parse(savedData),
          step: parseInt(savedStep)
        };
      }
    } catch (error) {
      console.error('❌ Erro ao carregar dados salvos:', error);
    }
    return null;
  };

  const savedState = loadSavedData();
  
  const [currentStep, setCurrentStep] = useState(savedState?.step || 1);
  const [saveStatus, setSaveStatus] = useState('💾 Pronto');
  const totalSteps = 7;
  const [formData, setFormData] = useState(savedState?.data || {
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
    caracteristicasDor: '',
    
    // Etapa 3 - História médica
    medicamentosAtuais: '',
    alergias: '',
    cirurgiasPrevias: '',
    hospitalizacoes: '',
    doencasAnteriores: '',
    examesRecentes: '',
    vacinasEmDia: '',
    
    // Etapa 4 - História familiar
    historiaFamiliar: '',
    doencasHereditarias: '',
    historicoCancer: '',
    historicoCardiovascular: '',
    familiaDiabetes: '',
    familiaHipertensao: '',
    outrasInformacoesFamiliares: '',
    
    // Etapa 5 - Hábitos de vida
    tabagismo: '',
    alcoolismo: '',
    detalhesTabacoAlcool: '',
    atividadeFisica: '',
    alimentacao: '',
    qualidadeSono: '',
    horasSono: '',
    padraoSono: '',
    stress: '',
    drogasIlicitas: '',
    fatoresEstresse: '',
    
    // Etapa 6 - Revisão de sistemas
    sistemaCardiovascular: '',
    sistemaRespiratorio: '',
    sistemaDigestivo: '',
    sistemaGeniturinario: '',
    sistemaNeurologico: '',
    sistemaMusculoesqueletico: '',
    sistemaPele: '',
    sistemaEndocrino: '',
    observacoesGerais: '',
    
    // Específico feminino
    cicloMenstrual: '',
    idadeMenarca: '',
    dataUltimaMenstruacao: '',
    duracaoCiclo: '',
    caracteristicasMenstruacao: '',
    jaEngravidou: '',
    numeroGestacoes: '',
    partos: '',
    abortos: '',
    tipoPartos: '',
    menopausa: '',
    idadeMenopausa: '',
    terapiaHormonal: '',
    metodoContraceptivo: '',
    examesGinecologicos: '',
    sintomasCiclo: '',
    
    // Específico masculino
    problemasProstaticos: '',
    sintomasUrinarios: '',
    disfuncaoEretil: '',
    alteracoesLibido: '',
    problemasEjaculacao: '',
    examesProstata: '',
    ultimoPSA: '',
    dataUltimoPSA: '',
    sintomasNoturnos: '',
    autoexameTesticular: '',
    alteracoesTesticulos: '',
    vasectomia: '',
    outrasQuestoesUrologicas: ''
  });

  // Auto-save sempre que os dados mudarem (simplificado)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      try {
        localStorage.setItem('anamneseFormData', JSON.stringify(formData));
        localStorage.setItem('anamneseCurrentStep', currentStep.toString());
        setSaveStatus('✅ Salvo');
        setTimeout(() => setSaveStatus('💾 Pronto'), 1000);
      } catch (error) {
        console.error('❌ Erro ao salvar dados:', error);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [formData, currentStep]);

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
    console.log('✅ Finalizando anamnese...');
    
    // Salvar dados finais no localStorage
    localStorage.setItem('anamneseData', JSON.stringify(formData));
    
    // Marcar anamnese como concluída para habilitar próximos passos
    localStorage.setItem('anamneseConcluida', 'true');
    localStorage.setItem('anamneseDataConclusao', new Date().toISOString());
    
    // Limpar dados temporários do formulário
    localStorage.removeItem('anamneseFormData');
    localStorage.removeItem('anamneseCurrentStep');
    localStorage.removeItem('anamneseBackup');
    
    console.log('🎉 Anamnese marcada como concluída');
    alert('Anamnese concluída com sucesso! Agora você pode fazer upload dos exames.');
    navigate('/menu');
  };

  // Função para limpar dados salvos (se o usuário quiser recomeçar)
  const clearSavedData = () => {
    if (window.confirm('Tem certeza que deseja limpar todos os dados e recomeçar?')) {
      localStorage.removeItem('anamneseFormData');
      localStorage.removeItem('anamneseCurrentStep');
      window.location.reload();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <DadosPessoais formData={formData} handleChange={handleChange} />;
      
      case 2:
        return <QueixaPrincipal formData={formData} handleChange={handleChange} />;
      
      case 3:
        return <HistoriaMedica formData={formData} handleChange={handleChange} />;
      
      case 4:
        return <HistoriaFamiliar formData={formData} handleChange={handleChange} />;
      
      case 5:
        return <HabitosVida formData={formData} handleChange={handleChange} />;
      
      case 6:
        return <RevisaoSistemas formData={formData} handleChange={handleChange} />;
      
      case 7:
        return (
          <div className="step-content">
            <h2>Questões Específicas por Gênero</h2>
            {formData.genero === 'feminino' && (
              <QuestoesFemininas formData={formData} handleChange={handleChange} />
            )}
            {formData.genero === 'masculino' && (
              <QuestoesMasculinas formData={formData} handleChange={handleChange} />
            )}
            {!formData.genero && (
              <div className="gender-selection-notice">
                <p>⚠️ Selecione o gênero na primeira etapa para visualizar as questões específicas.</p>
              </div>
            )}
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
      6: 'Revisão de Sistemas',
      7: 'Questões Específicas'
    };
    return titles[step] || '';
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.nome.trim() !== '';
      default:
        return true;
    }
  };

  return (
    <div className="anamnese-container">
      <div className="anamnese-form">
        <div className="step-header">
          <div className="header-actions">
            <button 
              type="button" 
              onClick={() => navigate('/menu')}
              className="btn-back-menu"
              title="Voltar ao Menu"
            >
              ← Menu
            </button>
          </div>
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
