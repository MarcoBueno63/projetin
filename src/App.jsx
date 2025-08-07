import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
// import LoginSimples from './components/LoginSimples';
import CadastroMedico from './components/CadastroMedico';
import MenuPrincipal from './components/MenuPrincipal';
import Cadastro from './components/Cadastro';
import AnamneseForm from './components/AnamneseForm';
// import AnamneseFormCompleta from './components/AnamneseFormCompleta';
import AnamneseIntegrativa from './components/AnamneseIntegrativa';
// import ResultadoAnamnese from './components/ResultadoAnamnese';
import UploadExames from './components/UploadExames';
import ResultadoIA from './components/ResultadoIA';
import AnaliseIA from './components/AnaliseIA';
import RelatorioMedico from './components/RelatorioMedico';
import Dashboard from './components/Dashboard';
import DashboardPrincipal from './components/DashboardPrincipal_new';
import ChatComProfissional from './components/ChatComProfissional';
import ChatAnamnese from './components/ChatAnamnese';
import AgendarConsulta from './components/AgendarConsulta';
import Medicamentos from './components/Medicamentos';
import Configuracoes from './components/Configuracoes';
import HistoricoMedico from './components/HistoricoMedico';
import RecomendacoesMedicas from './components/RecomendacoesMedicas';
import NotificacoesSistema from './components/NotificacoesSistema';
import PerfilPaciente from './components/PerfilPaciente';
import DataSharing from './components/DataSharing';
import TestePage from './components/TestePage';
import TestePermissoes from './components/TestePermissoes';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard_fixed';
import AdminPaciente from './pages/AdminPaciente';
import ChatPaciente from './pages/ChatPaciente';
import DashboardEstatisticas from './pages/DashboardEstatisticas';
import TesteSimples from './components/TesteSimples';
import ConsultasMedico from './components/medico/ConsultasMedico';
import PacientesMedico from './components/medico/PacientesMedico';
import Prescricoes from './components/medico/Prescricoes';
import LaudosMedicos from './components/medico/LaudosMedicos';
import IADiagnostico from './components/medico/IADiagnostico';
import ExamesMedico from './components/medico/ExamesMedico';
import TesteAutoSave from './components/TesteAutoSave';
import TesteGendero from './components/TesteGendero';
import DiagnosticoAnamnese from './components/DiagnosticoAnamnese';
import RelatoriosMedico from './components/medico/RelatoriosMedico';
import Telemedicina from './components/medico/Telemedicina';
import AdminUsuarios from './pages/AdminUsuarios';
import AdminMedicos from './pages/AdminMedicos';
import AdminCadastros from './pages/AdminCadastros';
import AdminFornecedor from './pages/AdminFornecedor';

// 🚨 PROTEÇÃO ULTRA-RADICAL: Interceptar URL ANTES do React Router processar
(() => {
  const checkAndCleanUrl = () => {
    const currentUrl = window.location.href;
    const problematicParams = [
      'sistemaCardiovascular=',
      'sistemaRespiratorio=', 
      'sistemaDigestivo=',
      'sistemaGeniturinario=',
      'sistemaNeurologico=',
      'sistemaMusculoesqueletico=',
      'problemasProstaticos=',
      'disfuncaoEretil=',
      'alteracoesUrinarias=',
      'observacoes='
    ];
    
    const hasProblematicUrl = problematicParams.some(param => currentUrl.includes(param));
    
    if (hasProblematicUrl) {
      
      // Preservar dados ANTES de qualquer redirecionamento
      try {
        const savedData = localStorage.getItem('anamneseFormData');
        const savedStep = localStorage.getItem('anamneseCurrentStep');
        
        if (savedData && savedStep) {
          localStorage.setItem('anamneseRouterBackup', savedData);
          localStorage.setItem('anamneseRouterStep', savedStep);
        }
      } catch (error) {
        console.error('❌ Erro ao criar backup Router:', error);
      }
      
      // Redirecionamento FORÇADO no nível do App
      window.location.replace('/anamnese-integrativa');
      return true; // Indica que houve redirecionamento
    }
    
    return false; // Nenhum problema detectado
  };
  
  // Executar verificação imediatamente
  if (checkAndCleanUrl()) {
    // Se houve redirecionamento, parar execução
    return;
  }
})();

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/teste" element={<TestePage />} />
        <Route path="/teste-permissoes" element={<TestePermissoes />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login-simples" element={<LoginSimples />} /> */}
        <Route path="/admin/cadastro-medico" element={<CadastroMedico />} />
        <Route path="/menu" element={<MenuPrincipal />} />
        <Route path="/menu-principal" element={<MenuPrincipal />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/anamnese" element={<AnamneseForm />} />
        <Route path="/anamnese-integrativa" element={<AnamneseIntegrativa />} />
        <Route path="/anamnese-chat" element={<ChatAnamnese />} />
        <Route path="/teste-autosave" element={<TesteAutoSave />} />
        <Route path="/teste-genero" element={<TesteGendero />} />
        <Route path="/diagnostico-anamnese" element={<DiagnosticoAnamnese />} />
        <Route path="/teste" element={<TesteSimples />} />
        <Route path="/exames" element={<UploadExames />} />
        <Route path="/resultado" element={<ResultadoIA />} />
        <Route path="/ia-analise" element={<AnaliseIA />} />
        <Route path="/relatorio" element={<RelatorioMedico />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard-principal" element={<DashboardPrincipal />} />
        <Route path="/chat" element={<ChatComProfissional />} />
        <Route path="/agendar" element={<AgendarConsulta />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/configuracoes" element={<Configuracoes />} />
        <Route path="/historico" element={<HistoricoMedico />} />
        <Route path="/medico" element={<RecomendacoesMedicas />} />
        <Route path="/notificacoes" element={<NotificacoesSistema />} />
        <Route path="/perfil" element={<PerfilPaciente />} />
        <Route path="/compartilhamento" element={<DataSharing />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/paciente/:id" element={<AdminPaciente />} />
        <Route path="/admin/chat/:patientId" element={<ChatPaciente />} />
        <Route path="/admin/estatisticas" element={<DashboardEstatisticas />} />
        <Route path="/medico/consultas" element={<ConsultasMedico />} />
        <Route path="/medico/pacientes" element={<PacientesMedico />} />
        <Route path="/medico/prescricoes" element={<Prescricoes />} />
        <Route path="/medico/laudos" element={<LaudosMedicos />} />
        <Route path="/medico/ia-diagnostico" element={<IADiagnostico />} />
        <Route path="/medico/exames" element={<ExamesMedico />} />
        <Route path="/medico/relatorios" element={<RelatoriosMedico />} />
        <Route path="/medico/telemedicina" element={<Telemedicina />} />
        <Route path="/admin/usuarios" element={<AdminUsuarios />} />
        <Route path="/admin/medicos" element={<AdminMedicos />} />
        <Route path="/admin/cadastros" element={<AdminCadastros />} />
        <Route path="/admin-fornecedor" element={<AdminFornecedor />} />
        <Route path="/estatisticas" element={<DashboardEstatisticas />} />
      </Routes>
    </Router>
  );
}

export default App;
