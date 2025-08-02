import * as XLSX from 'xlsx';

// Função para exportar dados do paciente para Excel
export function exportarDadosParaExcel(dadosAnamnese, resultadoIA, exames) {
  try {
    // Criar workbook
    const wb = XLSX.utils.book_new();

    // Aba 1: Dados Pessoais
    const dadosPessoais = [
      ['Campo', 'Valor'],
      ['Nome', dadosAnamnese.nome || ''],
      ['Idade', dadosAnamnese.idade || ''],
      ['Gênero', dadosAnamnese.genero || ''],
      ['Data de Cadastro', new Date().toLocaleDateString('pt-BR')]
    ];
    
    const wsDadosPessoais = XLSX.utils.aoa_to_sheet(dadosPessoais);
    XLSX.utils.book_append_sheet(wb, wsDadosPessoais, 'Dados Pessoais');

    // Aba 2: Anamnese
    const dadosAnamnese_sheet = [
      ['Campo', 'Resposta'],
      ['Sintomas', dadosAnamnese.sintomas || ''],
      ['Histórico Médico', dadosAnamnese.historicoMedico || ''],
      ['Medicamentos', dadosAnamnese.medicamentos || ''],
      ['Alergias', dadosAnamnese.alergias || ''],
      ['Hipertensão', dadosAnamnese.hipertensao || ''],
      ['Pressão Arterial', dadosAnamnese.pressaoArterial || ''],
      ['Medicamentos Hipertensão', dadosAnamnese.medicamentosHipertensao || '']
    ];
    
    const wsAnamnese = XLSX.utils.aoa_to_sheet(dadosAnamnese_sheet);
    XLSX.utils.book_append_sheet(wb, wsAnamnese, 'Anamnese');

    // Aba 3: Exames
    const dadosExames = [
      ['Nome do Arquivo', 'Tipo', 'Tamanho (KB)', 'Data de Upload']
    ];
    
    if (exames && exames.length > 0) {
      exames.forEach(exame => {
        dadosExames.push([
          exame.name || 'Arquivo',
          exame.type || 'Desconhecido',
          exame.size ? Math.round(exame.size / 1024) : 'N/A',
          new Date().toLocaleDateString('pt-BR')
        ]);
      });
    } else {
      dadosExames.push(['Nenhum exame enviado', '', '', '']);
    }
    
    const wsExames = XLSX.utils.aoa_to_sheet(dadosExames);
    XLSX.utils.book_append_sheet(wb, wsExames, 'Exames');

    // Aba 4: Resultado da IA
    const dadosResultado = [
      ['Campo', 'Resultado'],
      ['Diagnósticos Prováveis', resultadoIA.diagnosticosProvaveis ? resultadoIA.diagnosticosProvaveis.join(', ') : ''],
      ['Especialidade Recomendada', resultadoIA.especialidadeRecomendada || ''],
      ['Exames Complementares', resultadoIA.examesComplementares ? resultadoIA.examesComplementares.join(', ') : ''],
      ['Orientações Gerais', resultadoIA.orientacoesGerais || ''],
      ['Nível de Urgência', resultadoIA.nivelUrgencia || ''],
      ['Observações', resultadoIA.observacoes || '']
    ];
    
    const wsResultado = XLSX.utils.aoa_to_sheet(dadosResultado);
    XLSX.utils.book_append_sheet(wb, wsResultado, 'Resultado IA');

    // Salvar arquivo
    const nomeArquivo = `relatorio-${dadosAnamnese.nome || 'paciente'}-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, nomeArquivo);

    return {
      sucesso: true,
      mensagem: 'Relatório exportado com sucesso!',
      arquivo: nomeArquivo
    };

  } catch (error) {
    console.error('Erro ao exportar para Excel:', error);
    return {
      sucesso: false,
      mensagem: 'Erro ao exportar relatório. Tente novamente.',
      erro: error.message
    };
  }
}

// Função para exportar dados dos pacientes (Admin)
export function exportarDadosPacientesParaExcel(pacientes) {
  try {
    const wb = XLSX.utils.book_new();

    // Aba 1: Lista de Pacientes
    const dadosPacientes = [
      ['ID', 'Nome', 'Idade', 'Gênero', 'Sintomas', 'Status', 'Data Cadastro']
    ];
    
    pacientes.forEach(paciente => {
      dadosPacientes.push([
        paciente.id || '',
        paciente.nome || '',
        paciente.idade || '',
        paciente.genero || '',
        paciente.sintomas || '',
        paciente.status || 'Em acompanhamento',
        paciente.dataCadastro || new Date().toLocaleDateString('pt-BR')
      ]);
    });
    
    const wsPacientes = XLSX.utils.aoa_to_sheet(dadosPacientes);
    XLSX.utils.book_append_sheet(wb, wsPacientes, 'Pacientes');

    // Aba 2: Estatísticas
    const totalPacientes = pacientes.length;
    const pacientesPorGenero = pacientes.reduce((acc, p) => {
      acc[p.genero] = (acc[p.genero] || 0) + 1;
      return acc;
    }, {});
    
    const pacientesPorStatus = pacientes.reduce((acc, p) => {
      const status = p.status || 'Em acompanhamento';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});

    const dadosEstatisticas = [
      ['Métrica', 'Valor'],
      ['Total de Pacientes', totalPacientes],
      ['', ''],
      ['Distribuição por Gênero', ''],
      ...Object.entries(pacientesPorGenero).map(([genero, count]) => [genero, count]),
      ['', ''],
      ['Distribuição por Status', ''],
      ...Object.entries(pacientesPorStatus).map(([status, count]) => [status, count])
    ];
    
    const wsEstatisticas = XLSX.utils.aoa_to_sheet(dadosEstatisticas);
    XLSX.utils.book_append_sheet(wb, wsEstatisticas, 'Estatísticas');

    // Salvar arquivo
    const nomeArquivo = `relatorio-pacientes-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, nomeArquivo);

    return {
      sucesso: true,
      mensagem: 'Relatório de pacientes exportado com sucesso!',
      arquivo: nomeArquivo
    };

  } catch (error) {
    console.error('Erro ao exportar pacientes para Excel:', error);
    return {
      sucesso: false,
      mensagem: 'Erro ao exportar relatório. Tente novamente.',
      erro: error.message
    };
  }
}

// Função para exportar agendamentos
export function exportarAgendamentosParaExcel(agendamentos) {
  try {
    const wb = XLSX.utils.book_new();

    // Aba 1: Agendamentos
    const dadosAgendamentos = [
      ['ID', 'Paciente', 'Médico', 'Especialidade', 'Data', 'Hora', 'Status', 'Motivo']
    ];
    
    agendamentos.forEach(agendamento => {
      dadosAgendamentos.push([
        agendamento.id || '',
        agendamento.pacienteId || '',
        agendamento.medicoId || '',
        agendamento.especialidade || '',
        agendamento.data || '',
        agendamento.hora || '',
        agendamento.status || 'Agendado',
        agendamento.motivo || ''
      ]);
    });
    
    const wsAgendamentos = XLSX.utils.aoa_to_sheet(dadosAgendamentos);
    XLSX.utils.book_append_sheet(wb, wsAgendamentos, 'Agendamentos');

    // Salvar arquivo
    const nomeArquivo = `agendamentos-${new Date().toISOString().split('T')[0]}.xlsx`;
    XLSX.writeFile(wb, nomeArquivo);

    return {
      sucesso: true,
      mensagem: 'Agendamentos exportados com sucesso!',
      arquivo: nomeArquivo
    };

  } catch (error) {
    console.error('Erro ao exportar agendamentos:', error);
    return {
      sucesso: false,
      mensagem: 'Erro ao exportar agendamentos. Tente novamente.',
      erro: error.message
    };
  }
}
