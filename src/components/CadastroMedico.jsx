import React, { useState, useRef } from 'react';
import ValidatedTextField from './ValidatedTextField';
import FeedbackSnackbar from './FeedbackSnackbar';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { useNavigate } from 'react-router-dom';
import { UserService } from '../services/userService';
import './Login.css';
import Avatar from '@mui/material/Avatar';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';

export default function CadastroMedico() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const emailRef = useRef();
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    confirmeSenha: '',
    cv: '',
    apresentacao: '',
    programas: '',
    especialidades: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState({ email: '', senha: '', nome: '', confirmeSenha: '', cv: '', apresentacao: '', programas: '', especialidades: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
    if (name === 'nome') {
      if (!value) msg = t('Campo obrigatório.');
      else if (value.length < 3) msg = t('Nome deve ter pelo menos 3 caracteres.');
    }
    if (name === 'confirmeSenha') {
      if (!value) msg = t('Campo obrigatório.');
      else if (value !== formData.senha) msg = t('As senhas não coincidem!');
    }
    if (name === 'cv') {
      if (!value) msg = t('Campo obrigatório para médicos.');
    }
    if (name === 'apresentacao') {
      if (!value) msg = t('Campo obrigatório para médicos.');
    }
    if (name === 'programas') {
      if (!value) msg = t('Campo obrigatório para médicos.');
    }
    if (name === 'especialidades') {
      if (!value) msg = t('Campo obrigatório para médicos.');
    }
    return msg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(prev => ({
      ...prev,
      [name]: validateField(name, value)
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let valid = true;
    let newError = { email: '', senha: '', nome: '', confirmeSenha: '', cv: '', apresentacao: '', programas: '', especialidades: '' };
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
    try {
      const resultado = await UserService.registrarUsuario({
        email: formData.email,
        senha: formData.senha,
        nome: formData.nome,
        tipo: 'medico',
        permissoes: ['medico', 'usuario', 'consultas', 'pacientes', 'prescricoes', 'exames'],
        cv: formData.cv,
        apresentacao: formData.apresentacao,
        programas: formData.programas,
        especialidades: formData.especialidades
      });
      if (resultado.sucesso) {
        setSnackbar({ open: true, message: t('Médico cadastrado com sucesso! Faça login agora.'), severity: 'success' });
        setFormData({
          email: '', senha: '', nome: '', confirmeSenha: '', cv: '', apresentacao: '', programas: '', especialidades: ''
        });
        setTimeout(() => navigate('/'), 1500);
      } else {
        setSnackbar({ open: true, message: resultado.mensagem, severity: 'error' });
      }
    } catch (error) {
      setSnackbar({ open: true, message: t('Erro interno. Tente novamente.'), severity: 'error' });
    }
    setIsLoading(false);
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
          <h2 style={{ marginTop: 8 }}>{t('Cadastro de Médico')}</h2>
        </div>
        <form onSubmit={handleRegister}>
          <ValidatedTextField
            label={t('Nome completo')}
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            error={!!error.nome}
            helperText={error.nome}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              )
            }}
          />
          <ValidatedTextField
            label={t('Currículo (CV)')}
            name="cv"
            value={formData.cv}
            onChange={handleChange}
            error={!!error.cv}
            helperText={error.cv}
            multiline
            minRows={2}
          />
          <ValidatedTextField
            label={t('Apresentação')}
            name="apresentacao"
            value={formData.apresentacao}
            onChange={handleChange}
            error={!!error.apresentacao}
            helperText={error.apresentacao}
            multiline
            minRows={2}
          />
          <ValidatedTextField
            label={t('Programas Terapêuticos')}
            name="programas"
            value={formData.programas}
            onChange={handleChange}
            error={!!error.programas}
            helperText={error.programas}
            multiline
            minRows={2}
          />
          <ValidatedTextField
            label={t('Especialidades')}
            name="especialidades"
            value={formData.especialidades}
            onChange={handleChange}
            error={!!error.especialidades}
            helperText={error.especialidades}
            multiline
            minRows={1}
          />
          <ValidatedTextField
            label={t('E-mail')}
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!error.email}
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
            error={!!error.senha}
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
          <ValidatedTextField
            label={t('Confirme a senha')}
            name="confirmeSenha"
            value={formData.confirmeSenha}
            onChange={handleChange}
            error={!!error.confirmeSenha}
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
          <button type="submit" className="login-button" disabled={isLoading} style={{ marginTop: 16, position: 'relative' }}>
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress size={22} color="inherit" style={{ marginRight: 8 }} />
                {t('Cadastrando...')}
              </span>
            ) : (
              t('Cadastrar')
            )}
          </button>
        </form>
        <div className="cadastro-medico-footer">
          <p>
            {t('Já é cadastrado?')}{' '}
            <button type="button" className="link-button" onClick={() => navigate('/')}>{t('Faça login aqui')}</button>
          </p>
        </div>
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

