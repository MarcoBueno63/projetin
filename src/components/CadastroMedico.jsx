import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CadastroMedico.css';

export default function CadastroMedico() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nome: '',
    crm: '',
    especialidade: '',
    telefone: '',
    whatsapp: '',
    email: '',
    endereco: {
      rua: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      pais: 'Brasil'
    },
    hospital: '',
    horarios: [],
    diasDisponiveis: [],
    avaliacoes: 0,
    preco: 0,
    foto: null,
    fotoPreview: '',
    apresentacao: '',
    qualificacoes: '',
    credenciais: '',
    chamada: '',
    curriculo: null,
    curriculoNome: ''
  });

  const [mensagem, setMensagem] = useState('');
  const [loading, setLoading] = useState(false);

  const especialidades = [
    'Cardiologia', 'Dermatologia', 'Endocrinologia', 'Ginecologia',
    'Neurologia', 'Oftalmologia', 'Ortopedia', 'Pediatria',
    'Psiquiatria', 'Urologia', 'Gastroenterologia', 'Pneumologia',
    'Reumatologia', 'Oncologia', 'Anestesiologia', 'Radiologia'
  ];

  const horariosDisponiveis = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00', '18:30'
  ];

  const diasSemana = [
    'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'
  ];

  const estados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
    'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
    'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('endereco.')) {
      const enderecoField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [enderecoField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de arquivo
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        setMensagem('❌ Formato de imagem inválido. Use JPG, PNG ou GIF.');
        return;
      }

      // Validar tamanho (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setMensagem('❌ Imagem muito grande. Máximo 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          foto: file,
          fotoPreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensagem('');

    try {
      // Validações
      if (!formData.nome || !formData.crm || !formData.especialidade) {
        throw new Error('Por favor, preencha todos os campos obrigatórios.');
      }

      // Validar CRM (formato básico)
      const crmRegex = /^\d{4,6}-[A-Z]{2}$/;
      if (!crmRegex.test(formData.crm)) {
        throw new Error('CRM deve estar no formato: 12345-SP');
      }

      // Validar telefone e WhatsApp (formato básico)
      const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
      if (!phoneRegex.test(formData.telefone)) {
        throw new Error('Telefone deve estar no formato: (11) 99999-9999');
      }

      if (!phoneRegex.test(formData.whatsapp)) {
        throw new Error('WhatsApp deve estar no formato: (11) 99999-9999');
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Email inválido.');
      }

      // Validar endereço
      if (!formData.endereco.rua || !formData.endereco.numero || 
          !formData.endereco.bairro || !formData.endereco.cidade || 
          !formData.endereco.estado) {
        throw new Error('Por favor, preencha todos os campos do endereço.');
      }

      // Simular salvamento
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Criar novo médico
      const novoMedico = {
        id: Date.now(),
        ...formData,
        dataCadastro: new Date().toISOString(),
        ativo: true
      };

      // Salvar no localStorage
      const medicos = JSON.parse(localStorage.getItem('medicos') || '[]');
      medicos.push(novoMedico);
      localStorage.setItem('medicos', JSON.stringify(medicos));

      setMensagem('✅ Médico cadastrado com sucesso!');
      
      // Limpar formulário após sucesso
      setTimeout(() => {
        navigate('/admin/medicos');
      }, 2000);

    } catch (error) {
      setMensagem(`❌ Erro: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cadastro-medico-container">
      <div className="cadastro-medico-card">
        <div className="cadastro-header">
          <button onClick={() => navigate('/admin/dashboard')} className="back-button">
            ← Voltar
          </button>
          <h2>👨‍⚕️ Cadastro de Médico</h2>
        </div>

        <form onSubmit={handleSubmit} className="cadastro-form">
          {/* Foto do Médico */}
          <div className="foto-section">
            <label htmlFor="foto">Foto do Médico:</label>
            <div className="foto-upload">
              {formData.fotoPreview ? (
                <img src={formData.fotoPreview} alt="Preview" className="foto-preview" />
              ) : (
                <div className="foto-placeholder">
                  📷 Clique para adicionar foto
                </div>
              )}
              <input
                type="file"
                id="foto"
                accept="image/*"
                onChange={handleFotoChange}
                className="foto-input"
              />
            </div>
          </div>

          {/* Dados Pessoais */}
          <div className="form-section">
            <h3>Dados Pessoais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nome">Nome Completo: *</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  placeholder="Dr. João Silva"
                />
              </div>

              <div className="form-group">
                <label htmlFor="crm">CRM: *</label>
                <input
                  type="text"
                  id="crm"
                  name="crm"
                  value={formData.crm}
                  onChange={handleInputChange}
                  required
                  placeholder="12345-SP"
                />
              </div>

              <div className="form-group">
                <label htmlFor="especialidade">Especialidade: *</label>
                <select
                  id="especialidade"
                  name="especialidade"
                  value={formData.especialidade}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione uma especialidade</option>
                  {especialidades.map(esp => (
                    <option key={esp} value={esp}>{esp}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="email">Email: *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="medico@hospital.com"
                />
              </div>
            </div>
          </div>

          {/* Contatos */}
          <div className="form-section">
            <h3>Contatos</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="telefone">Telefone: *</label>
                <input
                  type="tel"
                  id="telefone"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleInputChange}
                  required
                  placeholder="(11) 99999-9999"
                />
              </div>

              <div className="form-group">
                <label htmlFor="whatsapp">WhatsApp: *</label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  required
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </div>

          {/* Endereço */}
          <div className="form-section">
            <h3>Endereço</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="endereco.rua">Rua: *</label>
                <input
                  type="text"
                  id="endereco.rua"
                  name="endereco.rua"
                  value={formData.endereco.rua}
                  onChange={handleInputChange}
                  required
                  placeholder="Rua das Flores"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endereco.numero">Número: *</label>
                <input
                  type="text"
                  id="endereco.numero"
                  name="endereco.numero"
                  value={formData.endereco.numero}
                  onChange={handleInputChange}
                  required
                  placeholder="123"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endereco.complemento">Complemento:</label>
                <input
                  type="text"
                  id="endereco.complemento"
                  name="endereco.complemento"
                  value={formData.endereco.complemento}
                  onChange={handleInputChange}
                  placeholder="Sala 101"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endereco.bairro">Bairro: *</label>
                <input
                  type="text"
                  id="endereco.bairro"
                  name="endereco.bairro"
                  value={formData.endereco.bairro}
                  onChange={handleInputChange}
                  required
                  placeholder="Centro"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endereco.cidade">Cidade: *</label>
                <input
                  type="text"
                  id="endereco.cidade"
                  name="endereco.cidade"
                  value={formData.endereco.cidade}
                  onChange={handleInputChange}
                  required
                  placeholder="São Paulo"
                />
              </div>

              <div className="form-group">
                <label htmlFor="endereco.estado">Estado: *</label>
                <select
                  id="endereco.estado"
                  name="endereco.estado"
                  value={formData.endereco.estado}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Selecione um estado</option>
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="endereco.pais">País: *</label>
                <input
                  type="text"
                  id="endereco.pais"
                  name="endereco.pais"
                  value={formData.endereco.pais}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Dados Profissionais */}
          <div className="form-section">
            <h3>Dados Profissionais</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="hospital">Hospital/Clínica:</label>
                <input
                  type="text"
                  id="hospital"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  placeholder="Hospital Santa Maria"
                />
              </div>

              <div className="form-group">
                <label htmlFor="preco">Preço da Consulta (R$):</label>
                <input
                  type="number"
                  id="preco"
                  name="preco"
                  value={formData.preco}
                  onChange={handleInputChange}
                  min="0"
                  step="0.01"
                  placeholder="250.00"
                />
              </div>

              <div className="form-group">
                <label htmlFor="credenciais">Credenciais Profissionais:</label>
                <textarea
                  id="credenciais"
                  name="credenciais"
                  value={formData.credenciais}
                  onChange={handleInputChange}
                  placeholder="Ex: RQE, títulos, sociedades, registros, etc."
                  rows={2}
                />
              </div>

              <div className="form-group">
                <label htmlFor="curriculo">Currículo (PDF):</label>
                <input
                  type="file"
                  id="curriculo"
                  name="curriculo"
                  accept="application/pdf"
                  onChange={e => {
                    const file = e.target.files[0];
                    if (file && file.type === 'application/pdf') {
                      setFormData(prev => ({
                        ...prev,
                        curriculo: file,
                        curriculoNome: file.name
                      }));
                    }
                  }}
                />
                {formData.curriculoNome && (
                  <span className="curriculo-nome">Arquivo: {formData.curriculoNome}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="chamada">Chamada para Clientes:</label>
                <input
                  type="text"
                  id="chamada"
                  name="chamada"
                  value={formData.chamada}
                  onChange={handleInputChange}
                  placeholder="Ex: Médico humanizado, especialista em..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="apresentacao">Apresentação:</label>
                <textarea
                  id="apresentacao"
                  name="apresentacao"
                  value={formData.apresentacao}
                  onChange={handleInputChange}
                  placeholder="Fale sobre você, sua experiência, abordagem, etc."
                  rows={3}
                />
              </div>

              <div className="form-group">
                <label htmlFor="qualificacoes">Qualificações:</label>
                <textarea
                  id="qualificacoes"
                  name="qualificacoes"
                  value={formData.qualificacoes}
                  onChange={handleInputChange}
                  placeholder="Formação, títulos, cursos, certificações, etc."
                  rows={3}
                />
              </div>
            </div>
          </div>

          {/* Horários de Atendimento */}
          <div className="form-section">
            <h3>Horários de Atendimento</h3>
            <div className="checkbox-group">
              <label>Horários Disponíveis:</label>
              <div className="checkbox-grid">
                {horariosDisponiveis.map(horario => (
                  <label key={horario} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={horario}
                      checked={formData.horarios.includes(horario)}
                      onChange={(e) => handleCheckboxChange(e, 'horarios')}
                    />
                    {horario}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Dias da Semana */}
          <div className="form-section">
            <h3>Dias de Atendimento</h3>
            <div className="checkbox-group">
              <label>Dias Disponíveis:</label>
              <div className="checkbox-grid">
                {diasSemana.map(dia => (
                  <label key={dia} className="checkbox-label">
                    <input
                      type="checkbox"
                      value={dia}
                      checked={formData.diasDisponiveis.includes(dia)}
                      onChange={(e) => handleCheckboxChange(e, 'diasDisponiveis')}
                    />
                    {dia.charAt(0).toUpperCase() + dia.slice(1)}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Mensagem */}
          {mensagem && (
            <div className={`message ${mensagem.includes('✅') ? 'success' : 'error'}`}>
              {mensagem}
            </div>
          )}

          {/* Botão de envio */}
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar Médico'}
          </button>
        </form>
      </div>
    </div>
  );
}
