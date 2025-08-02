import React from 'react';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';

export default function ValidatedTextField({ label, value, onChange, error, helperText, ...props }) {
  const { t } = useTranslation();
  return (
    <TextField
      label={t(label)}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={error ? t(helperText) : ''}
      fullWidth
      {...props}
    />
  );
}
