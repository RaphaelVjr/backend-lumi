const { PrismaClient } = require('@prisma/client');

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

module.exports = {getAllFaturas, getFaturaById, findByNumeroCliente}
