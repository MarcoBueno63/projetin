import React, { useState, useRef } from 'react';
import ValidatedTextField from './ValidatedTextField';
import FeedbackSnackbar from './FeedbackSnackbar';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../services/userService';
import './Login.css';
import Avatar from '@mui/material/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export default function Login() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    tipoUsuario: 'usuario',
    nome: '',
    confirmeSenha: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState({ email: '', senha: '', nome: '', confirmeSenha: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [openRecDialog, setOpenRecDialog] = useState(false);
  const emailRef = useRef(null);

  // Usuários predefinidos para demonstração
  const usuariosPredefinidos = {
    'marco.bueno.cmkt@gmail.com': {
      senha: '123456',
      tipo: 'admin',
      nome: 'Marco Bueno',
      permissoes: ['admin', 'usuario', 'medico', 'cadastros', 'relatorios', 'estatisticas', 'todos']
    },
    'admin@healthsystem.com': {
      senha: 'admin123',
      tipo: 'admin',
      nome: 'Administrador',
      permissoes: ['admin', 'usuario', 'cadastros', 'relatorios', 'estatisticas']
    },
    'usuario@healthsystem.com': {
      senha: 'user123',
      tipo: 'usuario',
      nome: 'Usuário Comum',
      permissoes: ['usuario', 'anamnese', 'exames', 'consultas']
    },
    'medico@healthsystem.com': {
      senha: 'medico123',
      tipo: 'medico',
      nome: 'Dr. Médico',
      permissoes: ['medico', 'usuario', 'consultas', 'pacientes']
    }
  };

  // Validação em tempo real
  const validateField = (name, value) => {
    let msg = '';
    if (name === 'email') {
      if (!value) msg = t('Campo obrigatório.');
      else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) msg = t('E-mail inválido.');
    }
    if (name === 'senha') {
      if (!value) msg = t('Campo obrigatório.');
      else if (value.length < 6) msg = t('A senha deve ter pelo menos 6 caracteres!');
    }
    if (name === 'nome' && isRegistering) {
      if (!value) msg = t('Campo obrigatório.');
      else if (value.length < 3) msg = t('Nome deve ter pelo menos 3 caracteres.');
    }
    if (name === 'confirmeSenha' && isRegistering) {
      if (!value) msg = t('Campo obrigatório.');
      else if (value !== formData.senha) msg = t('As senhas não coincidem!');
    }
    return msg;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'rememberMe') {
      setRememberMe(checked);
      return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let valid = true;
    let newError = { email: '', senha: '', nome: '', confirmeSenha: '' };
    Object.keys(formData).forEach((key) => {
      newError[key] = validateField(key, formData[key]);
      if (newError[key]) valid = false;
    });
    setError(newError);
    if (!valid) {
      setSnackbar({ open: true, message: t('Preencha todos os campos corretamente!'), severity: 'error' });
      setIsLoading(false);
      return;
    }
    if (isRegistering) {
      try {
        const resultado = UserService.registrarUsuario({
          email: formData.email,
          senha: formData.senha,
          nome: formData.nome,
          tipo: formData.tipoUsuario,
          permissoes: getPermissoesPorTipo(formData.tipoUsuario)
        });
        if (resultado.sucesso) {
          setSnackbar({ open: true, message: t('Usuário cadastrado com sucesso! Faça login agora.'), severity: 'success' });
          setIsRegistering(false);
          setFormData({
            email: formData.email,
            senha: '',
            tipoUsuario: 'usuario',
            nome: '',
            confirmeSenha: ''
          });
        } else {
          setSnackbar({ open: true, message: resultado.mensagem, severity: 'error' });
        }
      } catch (error) {
        setSnackbar({ open: true, message: t('Erro interno. Tente novamente.'), severity: 'error' });
      }
      setIsLoading(false);
      return;
    }
    try {
      const resultadoLogin = UserService.login(formData.email, formData.senha);
      if (resultadoLogin.sucesso) {
        setSnackbar({ open: true, message: t('Login realizado com sucesso!'), severity: 'success' });
        if (rememberMe) {
          localStorage.setItem('usuario', JSON.stringify({
            email: formData.email,
            nome: resultadoLogin.nome,
            tipo: resultadoLogin.tipo,
            permissoes: resultadoLogin.permissoes,
            loggedIn: true,
            loginTime: new Date().toISOString()
          }));
        }
        setTimeout(() => {
          navigate('/menu');
        }, 1000);
      } else {
        const usuarioData = usuariosPredefinidos[formData.email];
        if (usuarioData && usuarioData.senha === formData.senha) {
          const dadosUsuario = {
            email: formData.email,
            nome: usuarioData.nome,
            tipo: usuarioData.tipo,
            permissoes: usuarioData.permissoes,
            loggedIn: true,
            loginTime: new Date().toISOString()
          };
          if (rememberMe) localStorage.setItem('usuario', JSON.stringify(dadosUsuario));
          setSnackbar({ open: true, message: t('Login realizado com sucesso!'), severity: 'success' });
          setTimeout(() => {
            navigate('/menu');
          }, 1000);
        } else {
          setSnackbar({ open: true, message: t('Email ou senha incorretos!'), severity: 'error' });
        }
      }
    } catch (error) {
      setSnackbar({ open: true, message: t('Erro interno. Tente novamente.'), severity: 'error' });
    }
    setIsLoading(false);
  };
  
  const getPermissoesPorTipo = (tipo) => {
    switch (tipo) {
      case 'admin':
        return ['admin', 'usuario', 'medico', 'cadastros', 'relatorios', 'estatisticas', 'todos'];
      case 'medico':
        return ['medico', 'usuario', 'consultas', 'pacientes', 'prescricoes', 'exames'];
      case 'usuario':
      default:
        return ['usuario', 'anamnese', 'exames', 'consultas'];
    }
  };

  const handleDemoLogin = (tipoDemo) => {
    const demos = {
      admin: 'admin@healthsystem.com',
      usuario: 'usuario@healthsystem.com',
      medico: 'medico@healthsystem.com'
    };
    
    const email = demos[tipoDemo];
    const userData = usuariosPredefinidos[email];
    
    setFormData({
      email: email,
      senha: userData.senha,
      tipoUsuario: tipoDemo,
      nome: '',
      confirmeSenha: ''
    });
    setIsRegistering(false);
  };
  
  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    setFormData({
      email: '',
      senha: '',
      tipoUsuario: 'usuario',
      nome: '',
      confirmeSenha: ''
    });
    setMessage('');
  };

  React.useEffect(() => {
    if (emailRef.current) emailRef.current.focus();
  }, []);

  return (
    <div className="login-container">
      <div className="login-card">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 16 }}>
          <Avatar sx={{ bgcolor: '#43a047', width: 64, height: 64 }}>
            <MedicalServicesIcon fontSize="large" />
          </Avatar>
          <h2 style={{ marginTop: 8 }}>{isRegistering ? t('Cadastro') : t('Login')}</h2>
        </div>
        <form onSubmit={handleLogin}>
          {isRegistering && (
            <ValidatedTextField
              label={t('Nome completo')}
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              error={error.nome}
              helperText={error.nome}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon color="action" />
                  </InputAdornment>
                )
              }}
            />
          )}
          <ValidatedTextField
            label={t('E-mail')}
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={error.email}
            helperText={error.email}
            type="email"
            inputRef={emailRef}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon color="action" />
                </InputAdornment>
              )
            }}
          />
          <ValidatedTextField
            label={t('Senha')}
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            error={error.senha}
            helperText={error.senha}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockOutlinedIcon color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword((show) => !show)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          {isRegistering && (
            <ValidatedTextField
              label={t('Confirme a senha')}
              name="confirmeSenha"
              value={formData.confirmeSenha}
              onChange={handleChange}
              error={error.confirmeSenha}
              helperText={error.confirmeSenha}
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword((show) => !show)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
          <div className="form-group">
            <label htmlFor="tipoUsuario" style={{ fontWeight: 500 }}>{t('Tipo de Usuário')}</label>
            <select 
              id="tipoUsuario"
              name="tipoUsuario"
              value={formData.tipoUsuario}
              onChange={handleChange}
              required
              style={{ padding: '8px', borderRadius: 8, border: '1px solid #43a047', marginTop: 4 }}
            >
              <option value="usuario">👤 {t('Usuário/Paciente')}</option>
              <option value="medico">👨‍⚕️ {t('Médico')}</option>
              <option value="admin">🔧 {t('Administrador')}</option>
            </select>
          </div>
          <FormControlLabel
            control={<Checkbox name="rememberMe" checked={rememberMe} onChange={handleChange} color="primary" />}
            label={t('Lembre-se de mim')}
            style={{ marginTop: 8 }}
          />
          <button type="submit" className="login-button" disabled={isLoading} style={{ marginTop: 16, position: 'relative' }}>
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={22} color="inherit" style={{ marginRight: 8 }} />
                {isRegistering ? t('Cadastrando...') : t('Entrando...')}
              </span>
            ) : (
              isRegistering ? t('Cadastrar') : t('Entrar')
            )}
          </button>
        </form>
        {!isRegistering && (
          <div className="demo-section">
            <p>{t('Acesso rápido para demonstração:')}</p>
            <div className="demo-buttons">
              <button 
                type="button" 
                className="demo-btn admin"
                onClick={() => handleDemoLogin('admin')}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <AdminPanelSettingsIcon style={{ color: '#1976d2' }} /> {t('Admin')}
              </button>
              <button 
                type="button" 
                className="demo-btn usuario"
                onClick={() => handleDemoLogin('usuario')}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <PersonIcon style={{ color: '#43a047' }} /> {t('Usuário')}
              </button>
              <button 
                type="button" 
                className="demo-btn medico"
                onClick={() => handleDemoLogin('medico')}
                style={{ display: 'flex', alignItems: 'center', gap: 4 }}
              >
                <MedicalServicesIcon style={{ color: '#43a047' }} /> {t('Médico')}
              </button>
            </div>
          </div>
        )}
        <div className="login-footer">
          <p>
            {isRegistering ? t('Já tem conta?') : t('Não tem conta?')}{' '}
            <button type="button" className="link-button" onClick={toggleMode}>
              {isRegistering ? t('Faça login aqui') : t('Cadastre-se aqui')}
            </button>
          </p>
          {!isRegistering && (
            <p>
              <button type="button" className="link-button" onClick={() => setOpenRecDialog(true)}>
                {t('Esqueci minha senha')}
              </button>
            </p>
          )}
        </div>
        <Dialog open={openRecDialog} onClose={() => setOpenRecDialog(false)}>
          <DialogTitle>{t('Recuperação de Senha')}</DialogTitle>
          <DialogContent>
            <p>{t('Informe seu e-mail para receber instruções de recuperação.')}</p>
            <ValidatedTextField
              label={t('E-mail')}
              name="recEmail"
              type="email"
              autoFocus
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenRecDialog(false)}>{t('Cancelar')}</Button>
            <Button variant="contained" color="primary" onClick={() => { setOpenRecDialog(false); setSnackbar({ open: true, message: t('Se o e-mail existir, você receberá instruções.'), severity: 'info' }); }}>{t('Recuperar')}</Button>
          </DialogActions>
        </Dialog>
        <FeedbackSnackbar
          open={snackbar.open}
          message={snackbar.message}
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        />
      </div>
    </div>
  );
}
