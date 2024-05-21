const express = require("express")
const FaturaController = require("../controllers/faturaController")

const router = express.Router()

/**
 * @swagger
 * /faturas:
 *   get:
 *     summary: Retrieve a list of faturas
 *     responses:
 *       200:
 *         description: A list of faturas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fatura'
 */
router.get("/", FaturaController.getAllFaturas)

/**
 * @swagger
 * /faturas/{id}:
 *   get:
 *     summary: Retrieve a single fatura
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the fatura to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A single fatura.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fatura'
 *       404:
 *         description: Fatura not found.
 */
router.get("/:id", FaturaController.getFaturaById)

/**
 * @swagger
 * /faturas/cliente/{numero_cliente}:
 *   get:
 *     summary: Retrieve faturas by numero_cliente
 *     parameters:
 *       - in: path
 *         name: numero_cliente
 *         required: true
 *         description: Cliente's numero to retrieve faturas.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A list of faturas for the specified cliente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fatura'
 *       404:
 *         description: No faturas found for the specified numero_cliente.
 */
router.get(
  "/cliente/:numero_cliente",
  FaturaController.getFaturaByNumeroCliente
)

/**
 * @swagger
 * /faturas/download/{id}:
 *   get:
 *     summary: Download a fatura file
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the fatura file to download.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fatura file downloaded successfully.
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Fatura file not found.
 */
router.get("/download/:id", FaturaController.downloadFaturaFile)

module.exports = router
