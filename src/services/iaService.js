// Serviço para integração com IA
// Configuração da API OpenAI
const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

// Função principal para análise com IA
export async function obterDiagnosticoIA(dados) {
  try {
    // Se não tiver chave da API, usar simulação
    if (!OPENAI_API_KEY) {
      console.warn('⚠️ Chave OpenAI não encontrada. Usando simulação.');
      return obterDiagnosticoSimulado(dados);
    }

    const prompt = `
Analise os seguintes dados médicos de um paciente e forneça um relatório profissional:

DADOS DO PACIENTE:
- Nome: ${dados.nome}
- Idade: ${dados.idade}
- Gênero: ${dados.genero}
- Sintomas: ${dados.sintomas}
- Histórico Médico: ${dados.historicoMedico}
- Medicamentos: ${dados.medicamentos}
- Alergias: ${dados.alergias}

Por favor, forneça:
1. Possíveis diagnósticos (com probabilidades)
2. Especialidade médica recomendada
3. Exames complementares sugeridos
4. Orientações gerais
5. Nível de urgência (1-5)
6. Sugestão de suplementos nutricionais ou fitoterápicos que podem auxiliar o paciente, se houver indicação (máximo 5, em array de strings, com nomes comerciais e princípios ativos, se possível)

Responda em formato JSON com as seguintes chaves:
- diagnosticosProvaveis: array de strings
- especialidadeRecomendada: string
- examesComplementares: array de strings
- orientacoesGerais: string
- nivelUrgencia: número de 1 a 5
- observacoes: string
- suplementosIndicados: array de strings
`;

    const response = await fetch(OPENAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'Você é um assistente médico especializado em análise de dados clínicos. Forneça análises profissionais e responsáveis. SEMPRE responda em JSON válido.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 1000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Erro na API OpenAI: ${response.status}`);
    }

    const data = await response.json();
    const resultadoTexto = data.choices[0].message.content;
    
    try {
      // Tentar fazer parse do JSON retornado
      const resultadoJSON = JSON.parse(resultadoTexto);
      return resultadoJSON;
    } catch (parseError) {
      console.error('Erro ao fazer parse do JSON da OpenAI:', parseError);
      // Fallback para simulação se não conseguir fazer parse
      return obterDiagnosticoSimulado(dados);
    }

  } catch (error) {
    console.error('Erro na análise com IA:', error);
    // Fallback para simulação em caso de erro
    return obterDiagnosticoSimulado(dados);
  }
}

// Função de simulação (mantida como fallback)
function obterDiagnosticoSimulado(dados) {
  // Simula uma chamada para API de IA
  return new Promise((resolve) => {
    setTimeout(() => {
      const resultado = {
        diagnosticosProvaveis: [
          "Síndrome metabólica",
          "Hipertensão leve", 
          "Resistência à insulina"
        ],
        especialidadesRecomendadas: [
          "Endocrinologia",
          "Cardiologia", 
          "Nutrologia"
        ],
        orientacoesGerais: "Recomenda-se avaliação médica especializada, mudança no estilo de vida e exames complementares.",
        suplementosIndicados: [
          "Ômega 3 (EPA/DHA) - Catarinense",
          "Magnésio Dimalato - Sundown",
          "Vitamina D3 2000UI - Biolab"
        ]
      };
      resolve(resultado);
    }, 2000);
  });
}

// Função para traduzir texto (simulada)
export async function traduzirTexto(texto, destino = 'en') {
  // Simula tradução (depois integrar com LibreTranslate ou Google Translate)
  return new Promise((resolve) => {
    setTimeout(() => {
      const traducoes = {
        'en': 'This is a simulated translation to English',
        'es': 'Esta es una traducción simulada al español'
      };
      resolve(traducoes[destino] || texto);
    }, 1000);
  });
}
