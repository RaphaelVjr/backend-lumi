const { PrismaClient } = require('@prisma/client');
const fs = require('fs').promises; // Para manipulação de arquivos
const path = require('path');
const exec = require('child_process');
const prisma = new PrismaClient();

async function getAllInvoices() {
  return await prisma.invoices.findMany()
}

async function getInvoiceById(id) {
  return await prisma.invoices.findUnique({
    where: { id: id }
  })
}

async function findByNumeroCliente(numeroCliente) {
  return await prisma.invoices.findMany({
    where: {
      numero_cliente: {
        contains: numeroCliente
      }
    }
  })
}


async function invoiceImport(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const currentPath = req.file.path;
    const newPath = path.join(__dirname, 'invoices', req.file.filename);

    await fs.rename(currentPath, newPath);

    return res.status(200).json({ message: 'Arquivo PDF importado com sucesso', newPath });
  } catch (error) {
    return res.status(500).json({ error: `Erro ao importar invoice: ${error.message}` });
  }
}


module.exports = { getAllInvoices, getInvoiceById, findByNumeroCliente, invoiceImport}
