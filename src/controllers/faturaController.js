const FaturaService = require("../services/faturas.service")
const multer = require('multer');
const fs = require('fs').promises;
const { executarScriptPython } = require("../services/faturas.service");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'faturas');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


async function importarFatura(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const newPath = await FaturaService.importarFatura(req.file);
    return res.status(200).json({ message: 'Arquivo PDF importado com sucesso', newPath });
  } catch (error) {
    return res.status(500).json({ error: `Erro ao importar fatura: ${error.message}` });
  }
}

async function getAllFaturas(req, res) {
  try {
    const faturas = await FaturaService.getAllFaturas()
    res.json(faturas)
  } catch (error) {
    const errorResponse = {
      timestamp: new Date().toISOString(),
      errorCode: 500,
      errorMessage: error.message
    };
    res.status(500).json({ error: errorResponse });
  }
}

async function getFaturaById(req, res) {
  try {
    const id = parseInt(req.params.id)
    const fatura = await FaturaService.getFaturaById(id)
    if (fatura) {
      res.json(fatura)
    } else {
      const errorResponse = {
        timestamp: new Date().toISOString(),
        errorCode: 404,
        errorMessage: `Fatura não encontrada com o ID: ${id}`
      };
      res.status(404).json({ error: errorResponse });
    }
  } catch (error) {
    const errorResponse = {
      timestamp: new Date().toISOString(),
      errorCode: 500,
      errorMessage: error.message
    };
    res.status(500).json({ error: errorResponse });
  }
}

async function getFaturaByNumeroCliente(req, res) {
  try {
    const numeroCliente = req.params.numero_cliente
    const fatura = await FaturaService.findByNumeroCliente(numeroCliente)
    if (fatura.length > 0) {
      res.json(fatura)
    } else {
      const errorResponse = {
        timestamp: new Date().toISOString(),
        errorCode: 404,
        errorMessage: `Fatura não encontrada para este número de cliente: ${numeroCliente}`
      };
      res.status(404).json({ error: errorResponse });
    }
  } catch (error) {
    const errorResponse = {
      timestamp: new Date().toISOString(),
      errorCode: 500,
      errorMessage: error.message
    };
    res.status(500).json({ error: errorResponse });
  }
}

async function downloadFaturaFile(req, res) {
  try {
    const id = parseInt(req.params.id)
    const fatura = await FaturaService.getFaturaById(id)

    if (fatura) {
      res.download(`faturas_download/fatura-${fatura.id}.pdf`)
    } else {
      const errorResponse = {
        timestamp: new Date().toISOString(),
        errorCode: 404,
        errorMessage: "Arquivo não encontrado"
      };
      res.status(404).json({ error: errorResponse });
    }
  } catch (error) {
    const errorResponse = {
      timestamp: new Date().toISOString(),
      errorCode: 500,
      errorMessage: error.message
    };
    res.status(500).json({ error: errorResponse });
  }
}

module.exports = { downloadFaturaFile, getFaturaByNumeroCliente, getFaturaById, getAllFaturas, importarFatura, upload }
