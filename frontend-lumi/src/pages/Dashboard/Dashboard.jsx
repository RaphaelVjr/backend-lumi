import { useState } from 'react';
import api from '../../api'; // Importe a configuração do Axios

export default function Dashboard() {
  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await api.post('/importPDF', formData); // Use a instância do Axios

      if (response.status === 200) {
        console.log('PDF enviado com sucesso!');
      } else {
        console.error('Erro ao enviar o PDF.');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button type="submit">Enviar</button>
    </form>
  );
}