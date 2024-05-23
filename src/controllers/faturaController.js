const FaturaService = require("../services/faturas.service")

async function getAllFaturas(req, res) {
  try {
    const faturas = await FaturaService.getAllFaturas()
    res.json(faturas)
  } catch (error) {
    res.status(500).send(error.message)
  }
}

async function getFaturaById(req, res) {
  try {
    const id = parseInt(req.params.id)
    const fatura = await FaturaService.getFaturaById(id)
    if (fatura) {
      res.json(fatura)
    } else {
      res.status(404).send("Fatura not found")
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

async function getFaturaByNumeroCliente(req, res) {
  try {
    const numeroCliente = req.params.numero_cliente
    const fatura = await FaturaService.findByNumeroCliente(numeroCliente)
    if (fatura.length > 0) {
      res.json(fatura)
    } else {
      res.status(404).send("Fatura not found for the given Numero Cliente")
    }
  } catch (error) {
    res.status(500).send(error.message)
  }
}

async function downloadFaturaFile(req, res) {
  try {
    const id = parseInt(req.params.id)
    const fatura = await FaturaService.getFaturaById(id)

    if (fatura) {
      res.download(`faturas_download/fatura-${fatura.id}.pdf`)
    } else {
      res.status(404).send("File not found")
    }
  } catch (error) {
    console.error(error)
    res.status(500).send("Server error")
  }
}

module.exports = { downloadFaturaFile, getFaturaByNumeroCliente, getFaturaById, getAllFaturas}
