const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config
const importPDFRoute = require('./src/routes/importPDF.route')
const db = require('./src/database/db')
const port = 3000

app.use(cors());
app.use(express.json())
app.use("/importPDF", importPDFRoute);

db.connectDatabase().then(() => {
    console.log('Database connected successfully');
}).catch((err) => {
    console.error('Failed to connect to the database', err);
});


app.listen(port)