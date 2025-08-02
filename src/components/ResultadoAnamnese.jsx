import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResultadoAnamnese.css';

export default function ResultadoAnamnese() {
  const navigate = useNavigate();
  const [dadosAnamnese, setDadosAnamnese] = useState(null);

  useEffect(() => {
    const dados = localStorage.getItem('anamneseIntegrativa');
    if (dados) {
      setDadosAnamnese(JSON.parse(dados));
    }
  }, []);

  const formatarLista = (lista) => {
    if (!lista || lista.length === 0) return 'Nenhuma informação';
    return lista.join(', ');
  };

  const formatarData = (data) => {
    if (!data) return 'Não informado';
    return new Date(data).toLocaleDateString('pt-BR');
  };

  if (!dadosAnamnese) {
    return (
      <div className="resultado-anamnese">
        <div className="sem-dados">
          <h2>Nenhuma anamnese encontrada</h2>
          <button onClick={() => navigate('/anamnese-integrativa')}>
            Realizar Nova Anamnese
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="resultado-anamnese">
      <div className="header">
        <button 
          onClick={() => navigate('/dashboard-principal')}
          className="btn-voltar"
        >
          ← Voltar
        </button>
        <h1>📋 Resultado da Anamnese Integrativa</h1>
      </div>

      <div className="resultado-container">
        <div className="secao-resultado">
          <h2>👤 Dados Pessoais</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Nome:</strong> {dadosAnamnese.nome}
            </div>
            <div className="info-item">
              <strong>Idade:</strong> {dadosAnamnese.idade} anos
            </div>
            <div className="info-item">
              <strong>Gênero:</strong> {dadosAnamnese.genero}
            </div>
            <div className="info-item">
              <strong>Estado Civil:</strong> {dadosAnamnese.estadoCivil || 'Não informado'}
            </div>
            <div className="info-item">
              <strong>Profissão:</strong> {dadosAnamnese.profissao || 'Não informado'}
            </div>
            <div className="info-item">
              <strong>Escolaridade:</strong> {dadosAnamnese.escolaridade || 'Não informado'}
            </div>
          </div>
        </div>

        <div className="secao-resultado">
          <h2>💬 Queixa Principal</h2>
          <div className="info-item">
            <strong>Descrição:</strong> {dadosAnamnese.queixaPrincipal}
          </div>
          <div className="info-item">
            <strong>Início dos Sintomas:</strong> {dadosAnamnese.inicioSintomas || 'Não informado'}
          </div>
          {dadosAnamnese.historiaDoencaAtual && (
            <div className="info-item">
              <strong>História da Doença Atual:</strong> {dadosAnamnese.historiaDoencaAtual}
            </div>
          )}
        </div>

        <div className="secao-resultado">
          <h2>🏥 Antecedentes Médicos</h2>
          <div className="info-item">
            <strong>Doenças Pré-existentes:</strong> {formatarLista(dadosAnamnese.doencasPreexistentes)}
          </div>
          <div className="info-item">
            <strong>Medicamentos Atuais:</strong> {dadosAnamnese.medicamentosAtuais || 'Nenhum'}
          </div>
          <div className="info-item">
            <strong>Alergias:</strong> {formatarLista(dadosAnamnese.alergias)}
          </div>
          {dadosAnamnese.cirurgiasAnteriores && (
            <div className="info-item">
              <strong>Cirurgias Anteriores:</strong> {dadosAnamnese.cirurgiasAnteriores}
            </div>
          )}
          {dadosAnamnese.hospitalizacoes && (
            <div className="info-item">
              <strong>Hospitalizações:</strong> {dadosAnamnese.hospitalizacoes}
            </div>
          )}
        </div>

        <div className="secao-resultado">
          <h2>🏃‍♂️ Hábitos de Vida</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Tabagismo:</strong> {dadosAnamnese.tabagismo || 'Não informado'}
            </div>
            <div className="info-item">
              <strong>Álcool:</strong> {dadosAnamnese.etilismo || 'Não informado'}
            </div>
            <div className="info-item">
              <strong>Atividade Física:</strong> {dadosAnamnese.atividadeFisica || 'Não informado'}
            </div>
            <div className="info-item">
              <strong>Alimentação:</strong> {dadosAnamnese.alimentacao || 'Não informado'}
            </div>
            <div className="info-item">
              <strong>Sono:</strong> {dadosAnamnese.sono || 'Não informado'}
            </div>
            <div className="info-item">
              <strong>Estresse:</strong> {dadosAnamnese.estresse || 'Não informado'}
            </div>
          </div>
        </div>

        {dadosAnamnese.genero === 'feminino' && (
          <div className="secao-resultado genero-especifico">
            <h2>👩‍⚕️ Saúde da Mulher</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Menarca:</strong> {dadosAnamnese.menarca ? `${dadosAnamnese.menarca} anos` : 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Ciclo Menstrual:</strong> {dadosAnamnese.cicloMenstrual || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Gravidezes:</strong> {dadosAnamnese.gravidez || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Contraceptivos:</strong> {dadosAnamnese.contraceptivos || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Último Preventivo:</strong> {formatarData(dadosAnamnese.ultimoGinecologico)}
              </div>
              <div className="info-item">
                <strong>Última Mamografia:</strong> {formatarData(dadosAnamnese.ultimaMamografia)}
              </div>
              <div className="info-item">
                <strong>Autoexame das Mamas:</strong> {dadosAnamnese.autoexameMama || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Corrimento Vaginal:</strong> {dadosAnamnese.corrimentoVaginal || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Dispareunia:</strong> {dadosAnamnese.dispareunia || 'Não informado'}
              </div>
            </div>
          </div>
        )}

        {dadosAnamnese.genero === 'masculino' && (
          <div className="secao-resultado genero-especifico">
            <h2>👨‍⚕️ Saúde do Homem</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Sintomas Prostáticos:</strong> {dadosAnamnese.problemasProstaticos || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>PSA:</strong> {dadosAnamnese.psaRecente || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Disfunção Erétil:</strong> {dadosAnamnese.disfuncaoEretil || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Ejaculação Precoce:</strong> {dadosAnamnese.ejaculacaoPrecoce || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Autoexame Testicular:</strong> {dadosAnamnese.autoexameTesticular || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Libido:</strong> {dadosAnamnese.libido || 'Não informado'}
              </div>
              <div className="info-item">
                <strong>Ereções Noturnas:</strong> {dadosAnamnese.erecoesNoturnas || 'Não informado'}
              </div>
            </div>
          </div>
        )}

        {dadosAnamnese.genero === 'outro' && dadosAnamnese.informacoesAdicionais && (
          <div className="secao-resultado genero-especifico">
            <h2>⚕️ Informações Adicionais</h2>
            <div className="info-item">
              <strong>Informações:</strong> {dadosAnamnese.informacoesAdicionais}
            </div>
          </div>
        )}

        <div className="acoes-resultado">
          <button 
            onClick={() => navigate('/anamnese-integrativa')}
            className="btn-nova-anamnese"
          >
            📝 Nova Anamnese
          </button>
          <button 
            onClick={() => {
              const dataAtual = new Date().toLocaleDateString('pt-BR');
              const conteudo = `
ANAMNESE INTEGRATIVA - ${dataAtual}

DADOS PESSOAIS:
Nome: ${dadosAnamnese.nome}
Idade: ${dadosAnamnese.idade} anos
Gênero: ${dadosAnamnese.genero}
Estado Civil: ${dadosAnamnese.estadoCivil || 'Não informado'}
Profissão: ${dadosAnamnese.profissao || 'Não informado'}
Escolaridade: ${dadosAnamnese.escolaridade || 'Não informado'}

QUEIXA PRINCIPAL:
${dadosAnamnese.queixaPrincipal}
Início dos Sintomas: ${dadosAnamnese.inicioSintomas || 'Não informado'}

ANTECEDENTES MÉDICOS:
Doenças Pré-existentes: ${formatarLista(dadosAnamnese.doencasPreexistentes)}
Medicamentos Atuais: ${dadosAnamnese.medicamentosAtuais || 'Nenhum'}
Alergias: ${formatarLista(dadosAnamnese.alergias)}

HÁBITOS DE VIDA:
Tabagismo: ${dadosAnamnese.tabagismo || 'Não informado'}
Álcool: ${dadosAnamnese.etilismo || 'Não informado'}
Atividade Física: ${dadosAnamnese.atividadeFisica || 'Não informado'}
Alimentação: ${dadosAnamnese.alimentacao || 'Não informado'}
Sono: ${dadosAnamnese.sono || 'Não informado'}
Estresse: ${dadosAnamnese.estresse || 'Não informado'}

${dadosAnamnese.genero === 'feminino' ? `
SAÚDE DA MULHER:
Menarca: ${dadosAnamnese.menarca ? `${dadosAnamnese.menarca} anos` : 'Não informado'}
Ciclo Menstrual: ${dadosAnamnese.cicloMenstrual || 'Não informado'}
Gravidezes: ${dadosAnamnese.gravidez || 'Não informado'}
Contraceptivos: ${dadosAnamnese.contraceptivos || 'Não informado'}
Último Preventivo: ${formatarData(dadosAnamnese.ultimoGinecologico)}
Última Mamografia: ${formatarData(dadosAnamnese.ultimaMamografia)}
Autoexame das Mamas: ${dadosAnamnese.autoexameMama || 'Não informado'}
Corrimento Vaginal: ${dadosAnamnese.corrimentoVaginal || 'Não informado'}
Dispareunia: ${dadosAnamnese.dispareunia || 'Não informado'}
` : ''}

${dadosAnamnese.genero === 'masculino' ? `
SAÚDE DO HOMEM:
Sintomas Prostáticos: ${dadosAnamnese.problemasProstaticos || 'Não informado'}
PSA: ${dadosAnamnese.psaRecente || 'Não informado'}
Disfunção Erétil: ${dadosAnamnese.disfuncaoEretil || 'Não informado'}
Ejaculação Precoce: ${dadosAnamnese.ejaculacaoPrecoce || 'Não informado'}
Autoexame Testicular: ${dadosAnamnese.autoexameTesticular || 'Não informado'}
Libido: ${dadosAnamnese.libido || 'Não informado'}
Ereções Noturnas: ${dadosAnamnese.erecoesNoturnas || 'Não informado'}
` : ''}
              `;
              
              const blob = new Blob([conteudo], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `anamnese_${dadosAnamnese.nome}_${dataAtual.replace(/\//g, '-')}.txt`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="btn-baixar"
          >
            📥 Baixar Relatório
          </button>
        </div>
      </div>
    </div>
  );
}
