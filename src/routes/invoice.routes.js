const express = require("express")
const multer = require('multer');
const InvoiceController = require("../controllers/invoiceController")

const router = express.Router()

/**
 * @swagger
 * /invoices:
 *   get:
 *     summary: Retrieve a list of invoices
 *     responses:
 *       200:
 *         description: A list of invoices.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 */
router.get("/", InvoiceController.getAllInvoices)

/**
 * @swagger
 * /invoices/{id}:
 *   get:
 *     summary: Retrieve a single invoice
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the invoice to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single invoice.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found.
 */
router.get("/:id", InvoiceController.getInvoiceById)

/**
 * @swagger
 * /invoices/cliente/{numero_cliente}:
 *   get:
 *     summary: Retrieve invoices by numero_cliente
 *     parameters:
 *       - in: path
 *         name: numero_cliente
 *         required: true
 *         description: Cliente's numero to retrieve invoices.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of invoices for the specified cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: No invoices found for the specified numero_cliente.
 */
router.get(
  "/cliente/:numero_cliente",
  InvoiceController.getInvoiceByNumeroCliente
)

/**
 * @swagger
 * /invoices/download/{id}:
 *   get:
 *     summary: Download a invoice file
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the invoice file to download.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Invoice file downloaded successfully.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Invoice file not found.
 */
router.get("/download/:id", InvoiceController.downloadInvoiceFile)

router.post('/importar', InvoiceController.upload.array('arquivo'), InvoiceController.invoiceImport);

module.exports = router
