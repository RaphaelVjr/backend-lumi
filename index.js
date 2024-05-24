const express =  require("express")
const cors =  require("cors")
const faturaRoutes = require("./src/routes/fatura.routes")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerOptions =  require("./swaggerConfig")
const swaggerUi = require("swagger-ui-express")
const app = express()
const specs = swaggerJsdoc(swaggerOptions)
require('dotenv').config()
const PORT = process.env.PORT || 3000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

const options = { customCssUrl: '/public/swagger-ui.css', customSiteTitle: "Teste LUMI API - Swagger"};
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(specs, options))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/faturas", faturaRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app;