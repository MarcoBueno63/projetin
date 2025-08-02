import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PerfilPaciente.css';

export default function PerfilPaciente() {
  const navigate = useNavigate();
  const [perfil, setPerfil] = useState({
    nome: '',
    email: '',
    telefone: '',
    dataNascimento: '',
    genero: '',
    endereco: {
      rua: '',
      numero: '',
      cidade: '',
      estado: '',
      cep: ''
    },
    contatos: {
      emergencia: '',
      nomeEmergencia: ''
    },
    planoSaude: {
      operadora: '',
      numero: '',
      validade: ''
    },
    dadosMedicos: {
      tipoSanguineo: '',
      alergias: [],
      medicamentosUso: [],
      condicoesMedicas: []
    },
    foto: null,
    fotoPreview: ''
  });

  const [editando, setEditando] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = () => {
    const perfilSalvo = localStorage.getItem('perfilPaciente');
    if (perfilSalvo) {
      setPerfil(JSON.parse(perfilSalvo));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setPerfil(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      setPerfil(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleArrayChange = (section, index, value) => {
    setPerfil(prev => ({
      ...prev,
      dadosMedicos: {
        ...prev.dadosMedicos,
        [section]: prev.dadosMedicos[section].map((item, i) => 
          i === index ? value : item
        )
      }
    }));
  };

  const adicionarItem = (section) => {
    setPerfil(prev => ({
      ...prev,
      dadosMedicos: {
        ...prev.dadosMedicos,
        [section]: [...prev.dadosMedicos[section], '']
      }
    }));
  };

  const removerItem = (section, index) => {
    setPerfil(prev => ({
      ...prev,
      dadosMedicos: {
        ...prev.dadosMedicos,
        [section]: prev.dadosMedicos[section].filter((_, i) => i !== index)
      }
    }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPerfil(prev => ({
          ...prev,
          foto: file,
          fotoPreview: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const salvarPerfil = () => {
    setCarregando(true);
    
    setTimeout(() => {
      localStorage.setItem('perfilPaciente', JSON.stringify(perfil));
      setEditando(false);
      setCarregando(false);
      setMensagem('✅ Perfil atualizado com sucesso!');
      
      setTimeout(() => setMensagem(''), 3000);
    }, 1000);
  };

  const calcularIdade = (dataNascimento) => {
    if (!dataNascimento) return '';
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      return idade - 1;
    }
    return idade;
  };

  return (
    <div className="perfil-container">
      <div className="perfil-header">
        <h1>👤 Meu Perfil</h1>
        <div className="perfil-acoes">
          {editando ? (
            <>
              <button 
                className="btn-salvar" 
                onClick={salvarPerfil}
                disabled={carregando}
              >
                {carregando ? '⏳ Salvando...' : '💾 Salvar'}
              </button>
              <button 
                className="btn-cancelar" 
                onClick={() => setEditando(false)}
              >
                ❌ Cancelar
              </button>
            </>
          ) : (
            <button 
              className="btn-editar" 
              onClick={() => setEditando(true)}
            >
              ✏️ Editar
            </button>
          )}
        </div>
      </div>

      {mensagem && (
        <div className="mensagem-sucesso">
          {mensagem}
        </div>
      )}

      <div className="perfil-content">
        {/* Foto e Dados Básicos */}
        <div className="secao-perfil">
          <h2>📸 Foto e Dados Pessoais</h2>
          
          <div className="foto-perfil">
            {perfil.fotoPreview ? (
              <img src={perfil.fotoPreview} alt="Foto do perfil" />
            ) : (
              <div className="foto-placeholder">
                👤
              </div>
            )}
            
            {editando && (
              <input
                type="file"
                accept="image/*"
                onChange={handleFotoChange}
                className="input-foto"
              />
            )}
          </div>

          <div className="dados-grid">
            <div className="campo">
              <label>Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={perfil.nome}
                onChange={handleInputChange}
                disabled={!editando}
              />
            </div>

            <div className="campo">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={perfil.email}
                onChange={handleInputChange}
                disabled={!editando}
              />
            </div>

            <div className="campo">
              <label>Telefone</label>
              <input
                type="tel"
                name="telefone"
                value={perfil.telefone}
                onChange={handleInputChange}
                disabled={!editando}
              />
            </div>

            <div className="campo">
              <label>Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={perfil.dataNascimento}
                onChange={handleInputChange}
                disabled={!editando}
              />
              {perfil.dataNascimento && (
                <span className="idade">({calcularIdade(perfil.dataNascimento)} anos)</span>
              )}
            </div>

            <div className="campo">
              <label>Gênero</label>
              <select
                name="genero"
                value={perfil.genero}
                onChange={handleInputChange}
                disabled={!editando}
              >
                <option value="">Selecione</option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
                <option value="outro">Outro</option>
                <option value="nao-informar">Prefiro não informar</option>
              </select>
            </div>
          </div>
        </div>

        {/* Endereço */}
        <div className="secao-perfil">
          <h2>🏠 Endereço</h2>
          <div className="dados-grid">
            <div className="campo campo-amplo">
              <label>Rua</label>
              <input
                type="text"
                name="endereco.rua"
                value={perfil.endereco.rua}
                onChange={handleInputChange}
                disabled={!editando}
              />
            </div>

            <div className="campo">
              <label>Número</label>
              <input
                type="text"
                name="endereco.numero"
                value={perfil.endereco.numero}
                onChange={handleInputChange}
                disabled={!editando}
              />
            </div>

            <div className="campo">
              <label>Cidade</label>
              <input
                type="text"
                name="endereco.cidade"
                value={perfil.endereco.cidade}
                onChange={handleInputChange}
                disabled={!editando}
              />
            </div>

            <div className="campo">
              <label>Estado</label>
              <input
                type="text"
                name="endereco.estado"
                value={perfil.endereco.estado}
                onChange={handleInputChange}
                disabled={!editando}
              />
            </div>

            <div className="campo">
              <label>CEP</label>
              <input
                type="text"
                name="endereco.cep"
                value={perfil.endereco.cep}
                onChange={handleInputChange}
                disabled={!editando}
              />
            </div>
          </div>
        </div>

        {/* Dados Médicos */}
        <div className="secao-perfil">
          <h2>🩺 Dados Médicos</h2>
          
          <div className="campo">
            <label>Tipo Sanguíneo</label>
            <select
              name="dadosMedicos.tipoSanguineo"
              value={perfil.dadosMedicos.tipoSanguineo}
              onChange={handleInputChange}
              disabled={!editando}
            >
              <option value="">Selecione</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Lista de Alergias */}
          <div className="lista-campo">
            <label>🚫 Alergias</label>
            {perfil.dadosMedicos.alergias.map((alergia, index) => (
              <div key={index} className="item-lista">
                <input
                  type="text"
                  value={alergia}
                  onChange={(e) => handleArrayChange('alergias', index, e.target.value)}
                  disabled={!editando}
                  placeholder="Ex: Penicilina"
                />
                {editando && (
                  <button 
                    type="button"
                    onClick={() => removerItem('alergias', index)}
                    className="btn-remover"
                  >
                    ❌
                  </button>
                )}
              </div>
            ))}
            {editando && (
              <button 
                type="button"
                onClick={() => adicionarItem('alergias')}
                className="btn-adicionar"
              >
                ➕ Adicionar Alergia
              </button>
            )}
          </div>
        </div>

        {/* Botões de Navegação */}
        <div className="perfil-navegacao">
          <button 
            className="btn-voltar" 
            onClick={() => navigate('/menu')}
          >
            ← Voltar ao Menu
          </button>
        </div>
      </div>
    </div>
  );
}
