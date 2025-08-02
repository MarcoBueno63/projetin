import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      'Anamnese salva com sucesso!': 'Anamnese salva com sucesso!',
      'Exames enviados com sucesso!': 'Exames enviados com sucesso!',
      'Erro ao fazer upload dos exames. Tente novamente.': 'Erro ao fazer upload dos exames. Tente novamente.',
      // Adicione outras traduções aqui
    }
  },
  en: {
    translation: {
      'Anamnese salva com sucesso!': 'Anamnesis saved successfully!',
      'Exames enviados com sucesso!': 'Exams uploaded successfully!',
      'Erro ao fazer upload dos exames. Tente novamente.': 'Error uploading exams. Please try again.',
      // Add more translations here
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
