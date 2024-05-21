const fs = require('fs');
const pdf = require('pdf-parse');
const fileUploadService = require('../services/fileUpload.service')

const LerPDF = async (req, res) => {
    try {
        const file = req.files.pdf;
        const data = await fileUploadService.extractData(file);
        
        await fileUploadService.saveToDatabase(data);

        res.status(200).send({ message: 'Dados extraídos e salvos com sucesso!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ocorreu um erro ao processar o PDF.' });
    }
};


module.exports = { LerPDF };