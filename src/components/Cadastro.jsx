import React, { useState } from 'react';
import ValidatedTextField from './ValidatedTextField';
import FeedbackSnackbar from './FeedbackSnackbar';
import { useTranslation } from 'react-i18next';
import '../i18n';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css';

export default function Cadastro() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState({ nome: '', email: '', senha: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCadastro = (e) => {
    e.preventDefault();
    let valid = true;
    let newError = { nome: '', email: '', senha: '' };
    if (!nome || nome.length < 3) {
      newError.nome = 'Nome deve ter pelo menos 3 caracteres.';
      valid = false;
    }
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      newError.email = 'E-mail inválido.';
      valid = false;
    }
    if (!senha || senha.length < 6) {
      newError.senha = 'Senha deve ter pelo menos 6 caracteres.';
      valid = false;
    }
    setError(newError);
    if (!valid) {
      setSnackbar({ open: true, message: t('Preencha todos os campos corretamente!'), severity: 'error' });
      return;
    }
    // Simula cadastro
    setSnackbar({ open: true, message: t('Cadastro realizado com sucesso!'), severity: 'success' });
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2>{t('Cadastro')}</h2>
        <form onSubmit={handleCadastro}>
          <ValidatedTextField
            label="Nome completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            error={error.nome}
            helperText={error.nome}
          />
          <ValidatedTextField
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={error.email}
            helperText={error.email}
            type="email"
          />
          <ValidatedTextField
            label="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            error={error.senha}
            helperText={error.senha}
            type="password"
          />
          <button type="submit" style={{ marginTop: 16 }}>{t('Cadastrar')}</button>
        </form>
        <p className="login-link">
          {t('Já tem conta?')} <a href="/">{t('Faça login')}</a>
        </p>
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
