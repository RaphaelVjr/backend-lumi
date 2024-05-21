const pdfParse = require('pdf-parse');
const db = require('./db'); // Seu módulo de banco de dados (Prisma)

async function extractData(file) {
    try {
        const dataBuffer = file.data;
        const data = await pdfParse(dataBuffer);

        // Aqui você pode adicionar a lógica para extrair as informações relevantes
        const organizedData = {
            cliente: extractCliente(data.text),
            mesReferencia: extractMesReferencia(data.text),
            energiaEletrica: extractEnergiaEletrica(data.text),
            energiaSCEEE: extractEnergiaSCEEE(data.text),
            energiaCompensada: extractEnergiaCompensada(data.text),
            contribIlumPublica: extractContribIlumPublica(data.text),
        };

        console.log('Dados extraídos:', organizedData);
        return organizedData;
    } catch (error) {
        console.error('Erro na extração de dados:', error);
        throw error;
    }
}

async function saveToDatabase(data) {
    try {
        await db.faturas.create({
            data: {
                numero_cliente: data.cliente,
                mes_referencia: data.mesReferencia,
                energia_eletrica_quantidade: data.energiaEletrica,
                energia_scee_quantidade: data.energiaSCEEE,
                energia_compensada_quantidade: data.energiaCompensada,
                contrib_ilum_publica: data.contribIlumPublica,
            },
        });
        console.log('Dados salvos no banco de dados com sucesso!');
    } catch (error) {
        console.error('Erro ao salvar os dados no banco:', error);
        throw error;
    }
}

// Funções para extrair dados específicos do texto
function extractCliente(text) {
    const regex = /No DO CLIENTE: (\d+)/;
    const match = text.match(regex);
  
    if (match && match[1]) {
      return match[1];
    } else {
      console.warn('Número do cliente não encontrado no texto.');
      return null;
    }
}

function extractMesReferencia(text) {
    // Use uma expressão regular para encontrar o mês de referência
    // Exemplo: procure por um padrão como "DEZ/2023"
    const regex = /(\w{3})\/(\d{4})/; // Padrão para encontrar "DEZ/2023"
    const match = text.match(regex);
  
    if (match && match[1] && match[2]) {
      const monthMap = {
        JAN: '01',
        FEV: '02',
        MAR: '03',
        ABR: '04',
        MAI: '05',
        JUN: '06',
        JUL: '07',
        AGO: '08',
        SET: '09',
        OUT: '10',
        NOV: '11',
        DEZ: '12',
      };
  
      const month = monthMap[match[1]];
      const year = match[2];
  
      return `${year}-${month}`; // Formato: "2023-05"
    } else {
      console.warn('Mês de referência não encontrado no texto.');
      return null;
    }
  }

  function extractEnergiaEletrica(text) {
    const regex = /Energia Elétrica: R\$\s*([\d,.]+)/;
    const match = text.match(regex);
  
    if (match && match[1]) {
      const valorEnergia = parseFloat(match[1].replace(',', '.'));
      return valorEnergia;
    } else {
      console.warn('Valores de energia elétrica não encontrados no texto.');
      return null;
    }
  }
  
  function extractEnergiaSCEEE(text) {
    const regex = /Energia SCEEE s\/ICMS: R\$\s*([\d,.]+)/;
    const match = text.match(regex);
  
    if (match && match[1]) {
      const valorEnergiaSCEEE = parseFloat(match[1].replace(',', '.'));
      return valorEnergiaSCEEE;
    } else {
      console.warn('Valores de energia SCEEE não encontrados no texto.');
      return null;
    }
  }
  
  function extractEnergiaCompensada(text) {
    const regex = /Energia Compensada GD I: R\$\s*([\d,.]+)/;
    const match = text.match(regex);
  
    if (match && match[1]) {
      const valorEnergiaCompensada = parseFloat(match[1].replace(',', '.'));
      return valorEnergiaCompensada;
    } else {
      console.warn('Valores de energia compensada não encontrados no texto.');
      return null;
    }
  }
  
  function extractContribIlumPublica(text) {
    const regex = /Contrib Ilum Publica Municipal: R\$\s*([\d,.]+)/;
    const match = text.match(regex);
  
    if (match && match[1]) {
      const valorContribIlumPublica = parseFloat(match[1].replace(',', '.'));
      return valorContribIlumPublica;
    } else {
      console.warn('Valor da contribuição de iluminação pública não encontrado no texto.');
      return null;
    }
  }
  
  // Exemplo de uso:
  const textoDoPDF = `
  ... (texto completo do PDF) ...
  Energia Elétrica: R$ 95,19
  Energia SCEEE s/ICMS: R$ 659,82
  Energia Compensada GD I: R$ -633,04
  Contrib Ilum Publica Municipal: R$ 41,19
  ... (outros dados) ...
  `;
  
  const valorEnergiaEletrica = extractEnergiaEletrica(textoDoPDF);
  const valorEnergiaSCEEE = extractEnergiaSCEEE(textoDoPDF);
  const valorEnergiaCompensada = extractEnergiaCompensada(textoDoPDF);
  const valorContribIlumPublica = extractContribIlumPublica(textoDoPDF);
  
  console.log(`Valor de energia elétrica: R$ ${valorEnergiaEletrica}`);
  console.log(`Valor de energia SCEEE: R$ ${valorEnergiaSCEEE}`);
  console.log(`Valor de energia compensada: R$ ${valorEnergiaCompensada}`);
  console.log(`Valor da contribuição de iluminação pública: R$ ${valorContribIlumPublica}`);

module.exports = { extractData, saveToDatabase };