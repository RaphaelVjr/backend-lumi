const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises; // Para manipulação de arquivos
const path = require('path');
const exec = require('child_process');
const prisma = new PrismaClient();

async function getAllFaturas() {
  return await prisma.faturas.findMany()
}

async function getFaturaById(id) {
  return await prisma.faturas.findUnique({
    where: { id: id }
  })
}

async function findByNumeroCliente(numeroCliente) {
  return await prisma.faturas.findMany({
    where: {
      numero_cliente: {
        contains: numeroCliente
      }
    }
  })
}


async function importarFatura(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    // Caminho atual do arquivo
    const currentPath = req.file.path;

    // Caminho novo do arquivo na pasta 'faturas'
    const newPath = path.join(__dirname, 'faturas', req.file.filename);

    // Move o arquivo para a pasta de faturas
    await fs.rename(currentPath, newPath);

    return res.status(200).json({ message: 'Arquivo PDF importado com sucesso', newPath });
  } catch (error) {
    return res.status(500).json({ error: `Erro ao importar fatura: ${error.message}` });
  }
}


module.exports = { getAllFaturas, getFaturaById, findByNumeroCliente, importarFatura}
