import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LS_KEY = 'fornecedoresSuplementos';

const AdminFornecedor = () => {
  const navigate = useNavigate();
  const [fornecedores, setFornecedores] = useState([]);
  const fornecedorInicial = { cnpj: '', nome: '', endereco: '', contato: '', produtos: [] };
  const produtoInicial = { codigo: '', nome: '', tamanho: '', peso: '', composicao: '' };
  const [novoFornecedor, setNovoFornecedor] = useState(fornecedorInicial);
  const [produtoTemp, setProdutoTemp] = useState(produtoInicial);
  const [editando, setEditando] = useState(null);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem(LS_KEY)) || [];
    setFornecedores(dados);
  }, []);

  const salvarNoStorage = (dados) => {
    setFornecedores(dados);
    localStorage.setItem(LS_KEY, JSON.stringify(dados));
  };

  const handleNovoFornecedor = (e) => {
    e.preventDefault();
    if (!novoFornecedor.nome) return alert('Informe o nome do fornecedor!');
    const lista = [...fornecedores, { ...novoFornecedor, produtos: [] }];
    salvarNoStorage(lista);
    setNovoFornecedor(fornecedorInicial);
    setEditando(null);
    setProdutoTemp(produtoInicial);
  };

  const removerFornecedor = (idx) => {
    if (window.confirm('Remover este fornecedor?')) {
      const lista = fornecedores.filter((_, i) => i !== idx);
      salvarNoStorage(lista);
    }
  };

  const iniciarEdicao = (idx) => {
    setEditando(idx);
    setProdutoTemp(produtoInicial);
  };

  const adicionarProduto = (idx) => {
    if (!produtoTemp.nome) return alert('Informe o nome do produto!');
    const lista = fornecedores.map((f, i) =>
      i === idx ? { ...f, produtos: [...f.produtos, { ...produtoTemp }] } : f
    );
    salvarNoStorage(lista);
    setProdutoTemp(produtoInicial);
  };

  const removerProduto = (idxFornecedor, idxProduto) => {
    const lista = fornecedores.map((f, i) =>
      i === idxFornecedor ? { ...f, produtos: f.produtos.filter((_, j) => j !== idxProduto) } : f
    );
    salvarNoStorage(lista);
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
      <button onClick={() => navigate('/menu')} style={{ marginBottom: 16 }}>&larr; Voltar</button>
      <h1>Administração de Fornecedores de Suplementos</h1>
      <form onSubmit={handleNovoFornecedor} style={{ marginBottom: 32, background: '#f8f9fa', padding: 16, borderRadius: 8 }}>
        <h2>Novo Fornecedor</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          <input
            type="text"
            placeholder="CNPJ"
            value={novoFornecedor.cnpj}
            onChange={e => setNovoFornecedor({ ...novoFornecedor, cnpj: e.target.value })}
            style={{ flex: 1, minWidth: 180 }}
            required
          />
          <input
            type="text"
            placeholder="Nome do fornecedor"
            value={novoFornecedor.nome}
            onChange={e => setNovoFornecedor({ ...novoFornecedor, nome: e.target.value })}
            style={{ flex: 2, minWidth: 220 }}
            required
          />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
          <input
            type="text"
            placeholder="Endereço completo"
            value={novoFornecedor.endereco}
            onChange={e => setNovoFornecedor({ ...novoFornecedor, endereco: e.target.value })}
            style={{ flex: 3, minWidth: 300 }}
            required
          />
          <input
            type="text"
            placeholder="Contato (opcional)"
            value={novoFornecedor.contato}
            onChange={e => setNovoFornecedor({ ...novoFornecedor, contato: e.target.value })}
            style={{ flex: 1, minWidth: 180 }}
          />
        </div>
        <button type="submit" style={{ marginTop: 12, marginLeft: 0 }}>Cadastrar</button>
      </form>

      <h2>Fornecedores Cadastrados</h2>
      {fornecedores.length === 0 && <p>Nenhum fornecedor cadastrado.</p>}
      {fornecedores.map((forn, idx) => (
        <div key={idx} style={{ border: '1px solid #ddd', borderRadius: 8, marginBottom: 24, padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong>{forn.nome}</strong> <span style={{ color: '#888' }}>{forn.cnpj}</span><br/>
              <span style={{ color: '#888' }}>{forn.endereco}</span><br/>
              <span style={{ color: '#888' }}>{forn.contato}</span>
            </div>
            <button onClick={() => removerFornecedor(idx)} style={{ color: 'red' }}>Remover</button>
          </div>
          <div style={{ marginTop: 12 }}>
            <h4>Suplementos</h4>
            <ul>
              {forn.produtos && forn.produtos.length > 0 ? forn.produtos.map((prod, j) => (
                <li key={j}>
                  <b>{prod.codigo}</b> - <b>{prod.nome}</b> | {prod.tamanho} | {prod.peso} | {prod.composicao}
                  <button onClick={() => removerProduto(idx, j)} style={{ marginLeft: 8, color: 'red' }}>Remover</button>
                </li>
              )) : <li style={{ color: '#888' }}>Nenhum suplemento cadastrado.</li>}
            </ul>
            {editando === idx ? (
              <div style={{ marginTop: 8, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                <input
                  type="text"
                  placeholder="Código"
                  value={produtoTemp.codigo}
                  onChange={e => setProdutoTemp({ ...produtoTemp, codigo: e.target.value })}
                  style={{ minWidth: 80 }}
                />
                <input
                  type="text"
                  placeholder="Nome do produto"
                  value={produtoTemp.nome}
                  onChange={e => setProdutoTemp({ ...produtoTemp, nome: e.target.value })}
                  style={{ minWidth: 120 }}
                />
                <input
                  type="text"
                  placeholder="Tamanho"
                  value={produtoTemp.tamanho}
                  onChange={e => setProdutoTemp({ ...produtoTemp, tamanho: e.target.value })}
                  style={{ minWidth: 80 }}
                />
                <input
                  type="text"
                  placeholder="Peso"
                  value={produtoTemp.peso}
                  onChange={e => setProdutoTemp({ ...produtoTemp, peso: e.target.value })}
                  style={{ minWidth: 80 }}
                />
                <input
                  type="text"
                  placeholder="Composição"
                  value={produtoTemp.composicao}
                  onChange={e => setProdutoTemp({ ...produtoTemp, composicao: e.target.value })}
                  style={{ minWidth: 120 }}
                />
                <button onClick={() => adicionarProduto(idx)} style={{ marginLeft: 8 }}>Adicionar</button>
                <button onClick={() => setEditando(null)} style={{ marginLeft: 8 }}>Cancelar</button>
              </div>
            ) : (
              <button onClick={() => iniciarEdicao(idx)} style={{ marginTop: 8 }}>Adicionar Suplemento</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminFornecedor;
