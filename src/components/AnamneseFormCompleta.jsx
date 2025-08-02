import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AnamneseFormCompleta.css';

export default function AnamneseFormCompleta() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    // Dados Pessoais
    nome: '',
    idade: '',
    genero: '',
    peso: '',
    altura: '',
    profissao: '',
    estadoCivil: '',
    
    // Queixa Principal
    sintomas: '',
    duracaoSintomas: '',
    intensidadeDor: '',
    
    // Histórico Médico
    historicoMedico: '',
    cirurgiasPrevias: '',
    medicamentos: '',
    alergias: '',
    
    // Histórico Familiar
    historicoFamiliar: '',
    doencasHereditarias: '',
    
    // Hábitos de Vida
    fumante: '',
    alcool: '',
    drogas: '',
    atividadeFisica: '',
    alimentacao: '',
    sono: '',
    
    // Hipertensão
    temHipertensao: false,
    pressaoArterial: '',
    medicamentosHipertensao: '',
    
    // Perguntas Específicas por Gênero
    // Feminino
    menstruacao: '',
    cicloMenstrual: '',
    dataUltimaMenstruacao: '',
    gravidez: '',
    numeroGravidez: '',
    partos: '',
    abortos: '',
    menopausa: '',
    terapiaHormonal: '',
    examesPreventivosFemininos: '',
    
    // Masculino
    problemasProstaticos: '',
    disfuncaoEretil: '',
    exameProstata: '',
    libido: '',
    
    // Sistema Cardiovascular
    doresNoPeito: '',
    faltaDeAr: '',
    palpitacoes: '',
    inchacoPernas: '',
    
    // Sistema Digestivo
    problemaDigestivo: '',
    azia: '',
    constipacao: '',
    diarreia: '',
    
    // Sistema Neurológico
    doresDeCabeca: '',
    tonturas: '',
    formigamento: '',
    problemaMemoria: '',
    
    // Sistema Respiratório
    tosse: '',
    faltaDeArExercicio: '',
    chiado: '',
    
    // Sistema Urinário
    frequenciaUrinaria: '',
    dorUrinar: '',
    sangueUrina: '',
    
    // Observações
    observacoes: ''
  });

  const [etapaAtual, setEtapaAtual] = useState(1);
  const totalEtapas = 6;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const proximaEtapa = () => {
    if (etapaAtual < totalEtapas) {
      setEtapaAtual(etapaAtual + 1);
    }
  };

  const etapaAnterior = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Calcular IMC
    const imc = form.peso && form.altura ? (form.peso / Math.pow(form.altura / 100, 2)).toFixed(2) : null;
    
    const dadosCompletos = {
      ...form,
      imc,
      dataAnamnese: new Date().toISOString(),
      etapasConcluidas: totalEtapas
    };

    localStorage.setItem('anamnese', JSON.stringify(dadosCompletos));
    navigate('/exames');
  };

  const renderEtapa1 = () => (
    <div className="etapa-content">
      <h3>📋 Dados Pessoais</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Nome Completo *</label>
          <input 
            type="text" 
            name="nome" 
            value={form.nome} 
            onChange={handleChange} 
            required 
            placeholder="Nome completo"
          />
        </div>

        <div className="form-group">
          <label>Idade *</label>
          <input 
            type="number" 
            name="idade" 
            value={form.idade} 
            onChange={handleChange} 
            required 
            min="1"
            max="120"
            placeholder="Idade em anos"
          />
        </div>

        <div className="form-group">
          <label>Gênero *</label>
          <select name="genero" value={form.genero} onChange={handleChange} required>
            <option value="">Selecione o Gênero</option>
            <option value="feminino">Feminino</option>
            <option value="masculino">Masculino</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Peso (kg)</label>
          <input 
            type="number" 
            name="peso" 
            value={form.peso} 
            onChange={handleChange} 
            placeholder="Peso em kg"
            step="0.1"
          />
        </div>

        <div className="form-group">
          <label>Altura (cm)</label>
          <input 
            type="number" 
            name="altura" 
            value={form.altura} 
            onChange={handleChange} 
            placeholder="Altura em cm"
          />
        </div>

        <div className="form-group">
          <label>Profissão</label>
          <input 
            type="text" 
            name="profissao" 
            value={form.profissao} 
            onChange={handleChange} 
            placeholder="Sua profissão"
          />
        </div>

        <div className="form-group">
          <label>Estado Civil</label>
          <select name="estadoCivil" value={form.estadoCivil} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="solteiro">Solteiro(a)</option>
            <option value="casado">Casado(a)</option>
            <option value="divorciado">Divorciado(a)</option>
            <option value="viuvo">Viúvo(a)</option>
            <option value="uniao_estavel">União Estável</option>
          </select>
        </div>
      </div>

      {form.peso && form.altura && (
        <div className="imc-info">
          <p><strong>IMC Calculado:</strong> {(form.peso / Math.pow(form.altura / 100, 2)).toFixed(2)}</p>
        </div>
      )}
    </div>
  );

  const renderEtapa2 = () => (
    <div className="etapa-content">
      <h3>🩺 Queixa Principal e Sintomas</h3>
      
      <div className="form-group">
        <label>Sintomas Principais *</label>
        <textarea 
          name="sintomas" 
          value={form.sintomas} 
          onChange={handleChange} 
          rows={4}
          required
          placeholder="Descreva detalhadamente seus sintomas principais"
        />
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>Duração dos Sintomas</label>
          <select name="duracaoSintomas" value={form.duracaoSintomas} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="menos_1_dia">Menos de 1 dia</option>
            <option value="1_7_dias">1 a 7 dias</option>
            <option value="1_4_semanas">1 a 4 semanas</option>
            <option value="1_6_meses">1 a 6 meses</option>
            <option value="mais_6_meses">Mais de 6 meses</option>
          </select>
        </div>

        <div className="form-group">
          <label>Intensidade da Dor (se houver)</label>
          <select name="intensidadeDor" value={form.intensidadeDor} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="1">1 - Muito Leve</option>
            <option value="2">2 - Leve</option>
            <option value="3">3 - Leve a Moderada</option>
            <option value="4">4 - Moderada</option>
            <option value="5">5 - Moderada a Intensa</option>
            <option value="6">6 - Intensa</option>
            <option value="7">7 - Intensa a Muito Intensa</option>
            <option value="8">8 - Muito Intensa</option>
            <option value="9">9 - Quase Insuportável</option>
            <option value="10">10 - Insuportável</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderEtapa3 = () => (
    <div className="etapa-content">
      <h3>🏥 Histórico Médico</h3>
      
      <div className="form-group">
        <label>Histórico Médico Pessoal</label>
        <textarea 
          name="historicoMedico" 
          value={form.historicoMedico} 
          onChange={handleChange} 
          rows={3}
          placeholder="Doenças anteriores, hospitalizações, tratamentos..."
        />
      </div>

      <div className="form-group">
        <label>Cirurgias Prévias</label>
        <textarea 
          name="cirurgiasPrevias" 
          value={form.cirurgiasPrevias} 
          onChange={handleChange} 
          rows={3}
          placeholder="Cirurgias realizadas anteriormente..."
        />
      </div>

      <div className="form-group">
        <label>Medicamentos em Uso</label>
        <textarea 
          name="medicamentos" 
          value={form.medicamentos} 
          onChange={handleChange} 
          rows={3}
          placeholder="Medicamentos que você usa regularmente..."
        />
      </div>

      <div className="form-group">
        <label>Alergias</label>
        <textarea 
          name="alergias" 
          value={form.alergias} 
          onChange={handleChange} 
          rows={3}
          placeholder="Alergias a medicamentos, alimentos, outras substâncias..."
        />
      </div>

      <div className="form-group">
        <label>Histórico Familiar</label>
        <textarea 
          name="historicoFamiliar" 
          value={form.historicoFamiliar} 
          onChange={handleChange} 
          rows={3}
          placeholder="Doenças na família (pais, irmãos, avós)..."
        />
      </div>

      <div className="form-group">
        <label>Doenças Hereditárias</label>
        <textarea 
          name="doencasHereditarias" 
          value={form.doencasHereditarias} 
          onChange={handleChange} 
          rows={3}
          placeholder="Diabetes, hipertensão, câncer, doenças cardíacas..."
        />
      </div>
    </div>
  );

  const renderEtapa4 = () => (
    <div className="etapa-content">
      <h3>🏃‍♂️ Hábitos de Vida</h3>
      
      <div className="form-grid">
        <div className="form-group">
          <label>Fumante</label>
          <select name="fumante" value={form.fumante} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="nao">Não</option>
            <option value="sim_atual">Sim, atualmente</option>
            <option value="ex_fumante">Ex-fumante</option>
          </select>
        </div>

        <div className="form-group">
          <label>Consumo de Álcool</label>
          <select name="alcool" value={form.alcool} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="nao">Não bebo</option>
            <option value="social">Socialmente</option>
            <option value="moderado">Moderadamente</option>
            <option value="frequente">Frequentemente</option>
          </select>
        </div>

        <div className="form-group">
          <label>Uso de Drogas</label>
          <select name="drogas" value={form.drogas} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="nao">Não</option>
            <option value="ocasional">Ocasionalmente</option>
            <option value="frequente">Frequentemente</option>
          </select>
        </div>

        <div className="form-group">
          <label>Atividade Física</label>
          <select name="atividadeFisica" value={form.atividadeFisica} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="sedentario">Sedentário</option>
            <option value="leve">Leve (1-2x/semana)</option>
            <option value="moderado">Moderado (3-4x/semana)</option>
            <option value="intenso">Intenso (5+x/semana)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Alimentação</label>
          <select name="alimentacao" value={form.alimentacao} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="saudavel">Saudável</option>
            <option value="moderada">Moderada</option>
            <option value="inadequada">Inadequada</option>
          </select>
        </div>

        <div className="form-group">
          <label>Qualidade do Sono</label>
          <select name="sono" value={form.sono} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="excelente">Excelente</option>
            <option value="boa">Boa</option>
            <option value="regular">Regular</option>
            <option value="ruim">Ruim</option>
          </select>
        </div>
      </div>

      {/* Hipertensão */}
      <div className="form-group">
        <label className="checkbox-label">
          <input 
            type="checkbox" 
            name="temHipertensao" 
            checked={form.temHipertensao} 
            onChange={handleChange}
          />
          Tem hipertensão arterial?
        </label>
      </div>

      {form.temHipertensao && (
        <div className="form-grid">
          <div className="form-group">
            <label>Pressão Arterial Habitual</label>
            <input 
              type="text" 
              name="pressaoArterial" 
              value={form.pressaoArterial} 
              onChange={handleChange}
              placeholder="Ex: 140/90"
            />
          </div>

          <div className="form-group">
            <label>Medicamentos para Hipertensão</label>
            <textarea 
              name="medicamentosHipertensao" 
              value={form.medicamentosHipertensao} 
              onChange={handleChange}
              rows={2}
              placeholder="Medicamentos para controle da pressão"
            />
          </div>
        </div>
      )}
    </div>
  );

  const renderEtapa5 = () => (
    <div className="etapa-content">
      <h3>🚻 Perguntas Específicas por Gênero</h3>
      
      {form.genero === 'feminino' && (
        <div className="genero-especifico">
          <h4>👩 Saúde da Mulher</h4>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Menstruação</label>
              <select name="menstruacao" value={form.menstruacao} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="regular">Regular</option>
                <option value="irregular">Irregular</option>
                <option value="ausente">Ausente</option>
                <option value="menopausa">Menopausa</option>
              </select>
            </div>

            <div className="form-group">
              <label>Ciclo Menstrual (dias)</label>
              <input 
                type="number" 
                name="cicloMenstrual" 
                value={form.cicloMenstrual} 
                onChange={handleChange}
                placeholder="Ex: 28"
                min="20"
                max="40"
              />
            </div>

            <div className="form-group">
              <label>Data da Última Menstruação</label>
              <input 
                type="date" 
                name="dataUltimaMenstruacao" 
                value={form.dataUltimaMenstruacao} 
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Está Grávida?</label>
              <select name="gravidez" value={form.gravidez} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
                <option value="tentando">Tentando engravidar</option>
                <option value="nao_sei">Não sei</option>
              </select>
            </div>

            <div className="form-group">
              <label>Número de Gravidezes</label>
              <input 
                type="number" 
                name="numeroGravidez" 
                value={form.numeroGravidez} 
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Número de Partos</label>
              <input 
                type="number" 
                name="partos" 
                value={form.partos} 
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Número de Abortos</label>
              <input 
                type="number" 
                name="abortos" 
                value={form.abortos} 
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Menopausa</label>
              <select name="menopausa" value={form.menopausa} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
                <option value="pre_menopausa">Pré-menopausa</option>
              </select>
            </div>

            <div className="form-group">
              <label>Terapia Hormonal</label>
              <select name="terapiaHormonal" value={form.terapiaHormonal} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
                <option value="passado">No passado</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Exames Preventivos (Papanicolau, Mamografia)</label>
            <textarea 
              name="examesPreventivosFemininos" 
              value={form.examesPreventivosFemininos} 
              onChange={handleChange}
              rows={3}
              placeholder="Quando foi o último exame? Resultados?"
            />
          </div>
        </div>
      )}

      {form.genero === 'masculino' && (
        <div className="genero-especifico">
          <h4>👨 Saúde do Homem</h4>
          
          <div className="form-grid">
            <div className="form-group">
              <label>Problemas Prostáticos</label>
              <select name="problemasProstaticos" value={form.problemasProstaticos} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="sim">Sim</option>
                <option value="nao_sei">Não sei</option>
              </select>
            </div>

            <div className="form-group">
              <label>Disfunção Erétil</label>
              <select name="disfuncaoEretil" value={form.disfuncaoEretil} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Último Exame de Próstata</label>
              <input 
                type="date" 
                name="exameProstata" 
                value={form.exameProstata} 
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Libido</label>
              <select name="libido" value={form.libido} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="normal">Normal</option>
                <option value="diminuida">Diminuída</option>
                <option value="aumentada">Aumentada</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderEtapa6 = () => (
    <div className="etapa-content">
      <h3>🔍 Revisão por Sistemas</h3>
      
      <div className="sistemas-grid">
        <div className="sistema-section">
          <h4>❤️ Sistema Cardiovascular</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Dores no Peito</label>
              <select name="doresNoPeito" value={form.doresNoPeito} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Falta de Ar</label>
              <select name="faltaDeAr" value={form.faltaDeAr} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="exercicio">Apenas no exercício</option>
                <option value="repouso">Mesmo em repouso</option>
              </select>
            </div>

            <div className="form-group">
              <label>Palpitações</label>
              <select name="palpitacoes" value={form.palpitacoes} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Inchaço nas Pernas</label>
              <select name="inchacoPernas" value={form.inchacoPernas} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sistema-section">
          <h4>🍽️ Sistema Digestivo</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Problemas Digestivos</label>
              <select name="problemaDigestivo" value={form.problemaDigestivo} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Azia/Refluxo</label>
              <select name="azia" value={form.azia} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Constipação</label>
              <select name="constipacao" value={form.constipacao} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Diarreia</label>
              <select name="diarreia" value={form.diarreia} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sistema-section">
          <h4>🧠 Sistema Neurológico</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Dores de Cabeça</label>
              <select name="doresDeCabeca" value={form.doresDeCabeca} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tonturas</label>
              <select name="tonturas" value={form.tonturas} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Formigamento</label>
              <select name="formigamento" value={form.formigamento} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="maos">Mãos</option>
                <option value="pes">Pés</option>
                <option value="ambos">Ambos</option>
              </select>
            </div>

            <div className="form-group">
              <label>Problemas de Memória</label>
              <select name="problemaMemoria" value={form.problemaMemoria} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sistema-section">
          <h4>🫁 Sistema Respiratório</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Tosse</label>
              <select name="tosse" value={form.tosse} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="seca">Seca</option>
                <option value="produtiva">Com catarro</option>
              </select>
            </div>

            <div className="form-group">
              <label>Falta de Ar no Exercício</label>
              <select name="faltaDeArExercicio" value={form.faltaDeArExercicio} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="leve">Exercício leve</option>
                <option value="moderado">Exercício moderado</option>
                <option value="intenso">Exercício intenso</option>
              </select>
            </div>

            <div className="form-group">
              <label>Chiado no Peito</label>
              <select name="chiado" value={form.chiado} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>
          </div>
        </div>

        <div className="sistema-section">
          <h4>🚽 Sistema Urinário</h4>
          <div className="form-grid">
            <div className="form-group">
              <label>Frequência Urinária</label>
              <select name="frequenciaUrinaria" value={form.frequenciaUrinaria} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="normal">Normal</option>
                <option value="aumentada">Aumentada</option>
                <option value="diminuida">Diminuída</option>
              </select>
            </div>

            <div className="form-group">
              <label>Dor ao Urinar</label>
              <select name="dorUrinar" value={form.dorUrinar} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>

            <div className="form-group">
              <label>Sangue na Urina</label>
              <select name="sangueUrina" value={form.sangueUrina} onChange={handleChange}>
                <option value="">Selecione</option>
                <option value="nao">Não</option>
                <option value="ocasional">Ocasional</option>
                <option value="frequente">Frequente</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>Observações Adicionais</label>
        <textarea 
          name="observacoes" 
          value={form.observacoes} 
          onChange={handleChange}
          rows={4}
          placeholder="Qualquer informação adicional que considere importante..."
        />
      </div>
    </div>
  );

  const renderEtapa = () => {
    switch (etapaAtual) {
      case 1: return renderEtapa1();
      case 2: return renderEtapa2();
      case 3: return renderEtapa3();
      case 4: return renderEtapa4();
      case 5: return renderEtapa5();
      case 6: return renderEtapa6();
      default: return renderEtapa1();
    }
  };

  return (
    <div className="anamnese-completa-container">
      <div className="anamnese-completa-card">
        <div className="anamnese-header">
          <h2>📋 Anamnese Completa</h2>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(etapaAtual / totalEtapas) * 100}%` }}
            />
          </div>
          <p>Etapa {etapaAtual} de {totalEtapas}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {renderEtapa()}

          <div className="form-navigation">
            {etapaAtual > 1 && (
              <button type="button" onClick={etapaAnterior} className="btn-anterior">
                ← Anterior
              </button>
            )}
            
            {etapaAtual < totalEtapas ? (
              <button type="button" onClick={proximaEtapa} className="btn-proxima">
                Próxima →
              </button>
            ) : (
              <button type="submit" className="btn-submit">
                Finalizar Anamnese
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
