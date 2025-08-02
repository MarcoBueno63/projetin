
import React, { useState } from 'react';
import './ChatAnamnese.css';

// Blocos de perguntas agrupados
const blocos = [
  {
    id: 'dadosPessoais',
    titulo: 'Dados Pessoais',
    perguntas: [
      { chave: 'nome', texto: 'Qual seu nome completo?' },
      { chave: 'idade', texto: 'Qual sua idade?' },
      { chave: 'genero', texto: 'Qual seu gênero? (feminino, masculino, outro)' },
      { chave: 'peso', texto: 'Qual seu peso em kg?' },
      { chave: 'altura', texto: 'Qual sua altura em cm?' },
      { chave: 'profissao', texto: 'Qual sua profissão?' },
      { chave: 'estadoCivil', texto: 'Qual seu estado civil?' }
    ]
  },
  {
    id: 'queixaPrincipal',
    titulo: 'Queixa Principal',
    perguntas: [
      { chave: 'sintomas', texto: 'Descreva seus sintomas principais.' },
      { chave: 'duracaoSintomas', texto: 'Há quanto tempo sente esses sintomas?' },
      { chave: 'intensidadeDor', texto: 'Se há dor, qual a intensidade de 1 a 10?' }
    ]
  },
  {
    id: 'historicoMedico',
    titulo: 'Histórico Médico',
    perguntas: [
      { chave: 'historicoMedico', texto: 'Teve doenças anteriores, hospitalizações ou tratamentos?' },
      { chave: 'cirurgiasPrevias', texto: 'Já fez cirurgias? Quais?' },
      { chave: 'medicamentos', texto: 'Está usando algum medicamento atualmente?' },
      { chave: 'alergias', texto: 'Possui alergias?' }
    ]
  },
  {
    id: 'historicoFamiliar',
    titulo: 'Histórico Familiar',
    perguntas: [
      { chave: 'historicoFamiliar', texto: 'Há doenças importantes na família?' },
      { chave: 'doencasHereditarias', texto: 'Alguma doença hereditária?' }
    ]
  },
  {
    id: 'habitos',
    titulo: 'Hábitos de Vida',
    perguntas: [
      { chave: 'fumante', texto: 'Você fuma?' },
      { chave: 'alcool', texto: 'Consome álcool?' },
      { chave: 'drogas', texto: 'Usa alguma droga?' },
      { chave: 'atividadeFisica', texto: 'Pratica atividade física?' },
      { chave: 'alimentacao', texto: 'Como é sua alimentação?' },
      { chave: 'sono', texto: 'Como é seu sono?' }
    ]
  },
  {
    id: 'hipertensao',
    titulo: 'Hipertensão',
    perguntas: [
      { chave: 'temHipertensao', texto: 'Você tem hipertensão?' },
      { chave: 'pressaoArterial', texto: 'Sabe informar sua pressão arterial?' },
      { chave: 'medicamentosHipertensao', texto: 'Usa medicamentos para pressão?' }
    ]
  }
];

// Perguntas específicas por gênero
const perguntasFeminino = [
  { chave: 'menstruacao', texto: 'Como é sua menstruação?' },
  { chave: 'cicloMenstrual', texto: 'Como é seu ciclo menstrual?' },
  { chave: 'dataUltimaMenstruacao', texto: 'Data da última menstruação?' },
  { chave: 'gravidez', texto: 'Já esteve grávida?' },
  { chave: 'numeroGravidez', texto: 'Quantas gestações?' },
  { chave: 'partos', texto: 'Quantos partos?' },
  { chave: 'abortos', texto: 'Teve abortos?' },
  { chave: 'menopausa', texto: 'Está na menopausa?' },
  { chave: 'terapiaHormonal', texto: 'Faz terapia hormonal?' },
  { chave: 'examesPreventivosFemininos', texto: 'Fez exames preventivos femininos?' }
];
const perguntasMasculino = [
  { chave: 'problemasProstaticos', texto: 'Tem problemas prostáticos?' },
  { chave: 'disfuncaoEretil', texto: 'Tem disfunção erétil?' },
  { chave: 'exameProstata', texto: 'Já fez exame de próstata?' },
  { chave: 'libido', texto: 'Como está sua libido?' }
];

// Bloco de sintomas por sistemas
const sintomasSistemas = [
  { chave: 'doresNoPeito', texto: 'Sente dores no peito?' },
  { chave: 'faltaDeAr', texto: 'Sente falta de ar?' },
  { chave: 'palpitacoes', texto: 'Tem palpitações?' },
  { chave: 'inchacoPernas', texto: 'Tem inchaço nas pernas?' },
  { chave: 'problemaDigestivo', texto: 'Tem problemas digestivos?' },
  { chave: 'azia', texto: 'Sente azia?' },
  { chave: 'constipacao', texto: 'Tem constipação?' },
  { chave: 'diarreia', texto: 'Tem diarreia?' },
  { chave: 'doresDeCabeca', texto: 'Sente dores de cabeça?' },
  { chave: 'tonturas', texto: 'Tem tonturas?' },
  { chave: 'formigamento', texto: 'Sente formigamento?' },
  { chave: 'problemaMemoria', texto: 'Tem problemas de memória?' },
  { chave: 'tosse', texto: 'Tem tosse?' },
  { chave: 'faltaDeArExercicio', texto: 'Sente falta de ar ao fazer exercício?' },
  { chave: 'chiado', texto: 'Tem chiado no peito?' },
  { chave: 'frequenciaUrinaria', texto: 'Como está sua frequência urinária?' },
  { chave: 'dorUrinar', texto: 'Sente dor ao urinar?' },
  { chave: 'sangueUrina', texto: 'Já percebeu sangue na urina?' }
];

const blocoObservacoes = [
  { chave: 'observacoes', texto: 'Deseja acrescentar alguma observação?' }
];

function getPerguntasPorGenero(genero) {
  if (genero === 'feminino') return perguntasFeminino;
  if (genero === 'masculino') return perguntasMasculino;
  return [];
}

export default function ChatAnamnese({ onFinalizar }) {
  const [mensagens, setMensagens] = useState([
    { autor: 'sistema', texto: blocos[0].titulo },
    { autor: 'sistema', texto: blocos[0].perguntas[0].texto }
  ]);
  const [respostas, setRespostas] = useState({});
  const [blocoIdx, setBlocoIdx] = useState(0);
  const [perguntaIdx, setPerguntaIdx] = useState(0);
  const [input, setInput] = useState('');
  const [finalizado, setFinalizado] = useState(false);
  const [genero, setGenero] = useState('');
  const [fase, setFase] = useState('blocos'); // 'blocos', 'genero', 'sintomas', 'observacoes'
  const [perguntasGenero, setPerguntasGenero] = useState([]);

  // Função para avançar perguntas
  const avancar = (resposta) => {
    const blocoAtual = blocos[blocoIdx];
    const perguntaAtual = fase === 'blocos' ? blocoAtual.perguntas[perguntaIdx] : null;

    // Salva resposta
    if (fase === 'blocos' && perguntaAtual) {
      setRespostas(r => ({ ...r, [perguntaAtual.chave]: resposta }));
      if (perguntaAtual.chave === 'genero') {
        setGenero(resposta.toLowerCase());
        setPerguntasGenero(getPerguntasPorGenero(resposta.toLowerCase()));
      }
    }
    if (fase === 'genero' && perguntasGenero[perguntaIdx]) {
      setRespostas(r => ({ ...r, [perguntasGenero[perguntaIdx].chave]: resposta }));
    }
    if (fase === 'sintomas' && sintomasSistemas[perguntaIdx]) {
      setRespostas(r => ({ ...r, [sintomasSistemas[perguntaIdx].chave]: resposta }));
    }
    if (fase === 'observacoes' && blocoObservacoes[perguntaIdx]) {
      setRespostas(r => ({ ...r, [blocoObservacoes[perguntaIdx].chave]: resposta }));
    }

    // Avança para próxima pergunta ou bloco
    setInput('');
    setTimeout(() => {
      if (fase === 'blocos') {
        if (perguntaIdx + 1 < blocoAtual.perguntas.length) {
          setMensagens(m => [...m, { autor: 'usuario', texto: resposta }, { autor: 'sistema', texto: blocoAtual.perguntas[perguntaIdx + 1].texto }]);
          setPerguntaIdx(perguntaIdx + 1);
        } else if (blocoIdx + 1 < blocos.length) {
          setMensagens(m => [...m, { autor: 'usuario', texto: resposta }, { autor: 'sistema', texto: blocos[blocoIdx + 1].titulo }, { autor: 'sistema', texto: blocos[blocoIdx + 1].perguntas[0].texto }]);
          setBlocoIdx(blocoIdx + 1);
          setPerguntaIdx(0);
        } else if (perguntasGenero.length > 0) {
          setMensagens(m => [...m, { autor: 'usuario', texto: resposta }, { autor: 'sistema', texto: 'Agora perguntas específicas para seu gênero.' }, { autor: 'sistema', texto: perguntasGenero[0].texto }]);
          setFase('genero');
          setPerguntaIdx(0);
        } else {
          setMensagens(m => [...m, { autor: 'usuario', texto: resposta }, { autor: 'sistema', texto: 'Agora perguntas sobre sintomas por sistemas.' }, { autor: 'sistema', texto: sintomasSistemas[0].texto }]);
          setFase('sintomas');
          setPerguntaIdx(0);
        }
      } else if (fase === 'genero') {
        if (perguntaIdx + 1 < perguntasGenero.length) {
          setMensagens(m => [...m, { autor: 'usuario', texto: resposta }, { autor: 'sistema', texto: perguntasGenero[perguntaIdx + 1].texto }]);
          setPerguntaIdx(perguntaIdx + 1);
        } else {
          setMensagens(m => [...m, { autor: 'usuario', texto: resposta }, { autor: 'sistema', texto: 'Agora perguntas sobre sintomas por sistemas.' }, { autor: 'sistema', texto: sintomasSistemas[0].texto }]);
          setFase('sintomas');
          setPerguntaIdx(0);
        }
      } else if (fase === 'sintomas') {
        if (perguntaIdx + 1 < sintomasSistemas.length) {
          setMensagens(m => [...m, { autor: 'usuario', texto: resposta }, { autor: 'sistema', texto: sintomasSistemas[perguntaIdx + 1].texto }]);
          setPerguntaIdx(perguntaIdx + 1);
        } else {
          setMensagens(m => [...m, { autor: 'usuario', texto: resposta }, { autor: 'sistema', texto: blocoObservacoes[0].texto }]);
          setFase('observacoes');
          setPerguntaIdx(0);
        }
      } else if (fase === 'observacoes') {
        setMensagens(m => [...m, { autor: 'usuario', texto: resposta }, { autor: 'sistema', texto: 'Obrigado! Anamnese concluída.' }]);
        setFinalizado(true);
        if (onFinalizar) onFinalizar(respostas);
      }
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    avancar(input.trim());
  };

  return (
    <div className="chat-anamnese-container">
      <div className="chat-mensagens">
        {mensagens.map((msg, idx) => (
          <div key={idx} className={`chat-msg ${msg.autor}`}>{msg.texto}</div>
        ))}
      </div>
      {!finalizado && (
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Digite sua resposta..."
            autoFocus
          />
          <button type="submit">Enviar</button>
        </form>
      )}
      {finalizado && (
        <div className="chat-finalizado">Anamnese enviada com sucesso!</div>
      )}
    </div>
  );
}
