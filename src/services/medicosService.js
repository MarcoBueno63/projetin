// Serviço para gerenciamento de médicos
export const medicosDatabase = [
  {
    id: 1,
    nome: "Dr. João Silva",
    especialidade: "Cardiologia",
    crm: "12345-SP",
    telefone: "(11) 99999-0001",
    email: "joao.silva@hospital.com",
    hospital: "Hospital Santa Maria",
    horarios: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
    diasDisponiveis: ["segunda", "terça", "quarta", "quinta", "sexta"],
    avaliacoes: 4.8,
    preco: 250.00,
    foto: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=JS"
  },
  {
    id: 2,
    nome: "Dra. Maria Santos",
    especialidade: "Endocrinologia",
    crm: "23456-SP",
    telefone: "(11) 99999-0002",
    email: "maria.santos@hospital.com",
    hospital: "Hospital São José",
    horarios: ["08:00", "09:00", "10:00", "14:00", "15:00"],
    diasDisponiveis: ["segunda", "terça", "quarta", "quinta", "sexta"],
    avaliacoes: 4.9,
    preco: 280.00,
    foto: "https://via.placeholder.com/150x150/2196F3/FFFFFF?text=MS"
  },
  {
    id: 3,
    nome: "Dr. Carlos Oliveira",
    especialidade: "Neurologia",
    crm: "34567-SP",
    telefone: "(11) 99999-0003",
    email: "carlos.oliveira@hospital.com",
    hospital: "Hospital Central",
    horarios: ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    diasDisponiveis: ["segunda", "terça", "quinta", "sexta"],
    avaliacoes: 4.7,
    preco: 320.00,
    foto: "https://via.placeholder.com/150x150/FF9800/FFFFFF?text=CO"
  },
  {
    id: 4,
    nome: "Dra. Ana Costa",
    especialidade: "Dermatologia",
    crm: "45678-SP",
    telefone: "(11) 99999-0004",
    email: "ana.costa@hospital.com",
    hospital: "Clínica Dermatológica",
    horarios: ["08:00", "09:00", "10:00", "11:00", "14:00", "15:00"],
    diasDisponiveis: ["segunda", "terça", "quarta", "quinta", "sexta"],
    avaliacoes: 4.6,
    preco: 200.00,
    foto: "https://via.placeholder.com/150x150/E91E63/FFFFFF?text=AC"
  },
  {
    id: 5,
    nome: "Dr. Roberto Lima",
    especialidade: "Ortopedia",
    crm: "56789-SP",
    telefone: "(11) 99999-0005",
    email: "roberto.lima@hospital.com",
    hospital: "Hospital Ortopédico",
    horarios: ["08:00", "09:00", "10:00", "14:00", "15:00"],
    diasDisponiveis: ["segunda", "terça", "quarta", "quinta", "sexta"],
    avaliacoes: 4.5,
    preco: 300.00,
    foto: "https://via.placeholder.com/150x150/9C27B0/FFFFFF?text=RL"
  },
  {
    id: 6,
    nome: "Dra. Patricia Ferreira",
    especialidade: "Ginecologia",
    crm: "67890-SP",
    telefone: "(11) 99999-0006",
    email: "patricia.ferreira@hospital.com",
    hospital: "Hospital da Mulher",
    horarios: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
    diasDisponiveis: ["segunda", "terça", "quarta", "quinta", "sexta"],
    avaliacoes: 4.9,
    preco: 260.00,
    foto: "https://via.placeholder.com/150x150/673AB7/FFFFFF?text=PF"
  },
  {
    id: 7,
    nome: "Dr. Fernando Rocha",
    especialidade: "Oftalmologia",
    crm: "78901-SP",
    telefone: "(11) 99999-0007",
    email: "fernando.rocha@hospital.com",
    hospital: "Centro Oftalmológico",
    horarios: ["09:00", "10:00", "11:00", "14:00", "15:00"],
    diasDisponiveis: ["segunda", "terça", "quarta", "quinta", "sexta"],
    avaliacoes: 4.8,
    preco: 220.00,
    foto: "https://via.placeholder.com/150x150/00BCD4/FFFFFF?text=FR"
  },
  {
    id: 8,
    nome: "Dra. Lucia Mendes",
    especialidade: "Pediatria",
    crm: "89012-SP",
    telefone: "(11) 99999-0008",
    email: "lucia.mendes@hospital.com",
    hospital: "Hospital Infantil",
    horarios: ["08:00", "09:00", "10:00", "14:00", "15:00", "16:00"],
    diasDisponiveis: ["segunda", "terça", "quarta", "quinta", "sexta"],
    avaliacoes: 4.9,
    preco: 180.00,
    foto: "https://via.placeholder.com/150x150/4CAF50/FFFFFF?text=LM"
  }
];

// Função para buscar médicos por especialidade
export function buscarMedicosPorEspecialidade(especialidade) {
  return medicosDatabase.filter(medico => 
    medico.especialidade.toLowerCase().includes(especialidade.toLowerCase())
  );
}

// Função para buscar médico por ID
export function buscarMedicoPorId(id) {
  return medicosDatabase.find(medico => medico.id === parseInt(id));
}

// Função para buscar todas as especialidades
export function obterEspecialidades() {
  return [...new Set(medicosDatabase.map(medico => medico.especialidade))];
}

// Função para buscar médicos por nome
export function buscarMedicosPorNome(nome) {
  return medicosDatabase.filter(medico => 
    medico.nome.toLowerCase().includes(nome.toLowerCase())
  );
}

// Função para verificar disponibilidade
export function verificarDisponibilidade(medicoId, data, horario) {
  const medico = buscarMedicoPorId(medicoId);
  if (!medico) return false;
  
  const diaSemana = new Date(data).toLocaleDateString('pt-BR', { weekday: 'long' });
  const diaFormatado = diaSemana.replace('-feira', '');
  
  return medico.diasDisponiveis.includes(diaFormatado) && 
         medico.horarios.includes(horario);
}

// Função para agendar consulta
export function agendarConsulta(agendamento) {
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  
  const novoAgendamento = {
    id: Date.now(),
    ...agendamento,
    status: 'Agendado',
    dataAgendamento: new Date().toISOString()
  };
  
  agendamentos.push(novoAgendamento);
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
  
  return novoAgendamento;
}

// Função para obter agendamentos do paciente
export function obterAgendamentosPaciente(pacienteId) {
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  return agendamentos.filter(agendamento => agendamento.pacienteId === pacienteId);
}

// Função para obter agendamentos do médico
export function obterAgendamentosMedico(medicoId) {
  const agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
  return agendamentos.filter(agendamento => agendamento.medicoId === parseInt(medicoId));
}
