import React, { useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/build/pdf';
import 'pdfjs-dist/build/pdf.worker.entry';

const UploadExamePDF = ({ onTextoExtraido }) => {
  const [pdfName, setPdfName] = useState('');
  const [texto, setTexto] = useState('');
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const extrairTextoPDF = async (file) => {
    setLoading(true);
    setErro('');
    setTexto('');
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let textoExtraido = '';
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        const pageText = content.items.map(item => item.str).join(' ');
        textoExtraido += pageText + '\n';
      }
      setTexto(textoExtraido);
      if (onTextoExtraido) onTextoExtraido(textoExtraido);
      // Salva no localStorage para integração com IA
      localStorage.setItem('examePDFTexto', textoExtraido);
    } catch (e) {
      setErro('Erro ao extrair texto do PDF.');
    }
    setLoading(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfName(file.name);
      extrairTextoPDF(file);
    } else {
      setErro('Selecione um arquivo PDF válido.');
    }
  };

  return (
    <div className="upload-exame-pdf-container">
      <h3>Upload de Exame em PDF</h3>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      {pdfName && <p>Arquivo selecionado: {pdfName}</p>}
      {loading && <p>Extraindo texto do PDF...</p>}
      {erro && <p style={{color:'red'}}>{erro}</p>}
      {texto && (
        <div>
          <h4>Texto extraído:</h4>
          <textarea value={texto} readOnly rows={8} style={{width:'100%'}} />
        </div>
      )}
    </div>
  );
};

export default UploadExamePDF;
