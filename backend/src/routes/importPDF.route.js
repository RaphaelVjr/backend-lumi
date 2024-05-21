const route = require('express').Router();
const LerPDFController = require('../controllers/LerPDF.controller')

route.post("/importPDF", LerPDFController.LerPDF);

module.exports = route;