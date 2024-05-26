const InvoiceService = require("../services/invoices.service")
const multer = require('multer');
const fs = require('fs').promises;
const { executarScriptPython } = require("../services/invoices.service");
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'invoices');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });


async function invoiceImport(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Nenhum arquivo enviado' });
    }

    const newPath = await InvoiceService.invoiceImport(req.file);
    return res.status(200).json({ message: 'Arquivo PDF importado com sucesso', newPath });
  } catch (error) {
    return res.status(500).json({ error: `Erro ao importar invoice: ${error.message}` });
  }
}

async function getAllInvoices(req, res) {
  try {
    const invoices = await InvoiceService.getAllInvoices()
    res.json(invoices)
  } catch (error) {
    const errorResponse = {
      timestamp: new Date().toISOString(),
      errorCode: 500,
      errorMessage: error.message
    };
    res.status(500).json({ error: errorResponse });
  }
}

async function getInvoiceById(req, res) {
  try {
    const id = parseInt(req.params.id)
    const invoice = await InvoiceService.getInvoiceById(id)
    if (invoice) {
      const monthMapping = {
        'JAN': '01',
        'FEV': '02',
        'MAR': '03',
        'ABR': '04',
        'MAI': '05',
        'JUN': '06',
        'JUL': '07',
        'AGO': '08',
        'SET': '09',
        'OUT': '10',
        'NOV': '11',
        'DEZ': '12'
      };

      // Parse the mes_referencia to get the month and year
      const [month, year] = invoice.mes_referencia.split('/');
      invoice.month = monthMapping[month];
      invoice.year = year;

      // Generate the filename based on the invoice details
      const filename = `${invoice.installationNumber}-${invoice.month}-${invoice.year}.pdf`;
      invoice.filename = filename;
      res.json(invoice)
      return invoice;
    } else {
      const errorResponse = {
        timestamp: new Date().toISOString(),
        errorCode: 404,
        errorMessage: `Invoice não encontrada com o ID: ${id}`
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

async function getInvoiceByNumeroCliente(req, res) {
  try {
    const numeroCliente = req.params.numero_cliente
    const invoice = await InvoiceService.findByNumeroCliente(numeroCliente)
    if (invoice.length > 0) {
      res.json(invoice)
    } else {
      const errorResponse = {
        timestamp: new Date().toISOString(),
        errorCode: 404,
        errorMessage: `Invoice não encontrada para este número de cliente: ${numeroCliente}`
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

async function downloadInvoiceFile(req, res) {
  try {
    const id = parseInt(req.params.id)
    const invoice = await InvoiceService.getInvoiceById(id)

    if (invoice) {
      res.download(`invoices/${invoice.filename}`)
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

module.exports = { downloadInvoiceFile, getInvoiceByNumeroCliente, getInvoiceById, getAllInvoices, invoiceImport, upload }
