const express =  require("express")
const cors =  require("cors")
const faturaRoutes = require("./src/routes/fatura.routes")
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerOptions =  require("./swaggerConfig")
const swaggerUi = require("swagger-ui-express")
const app = express()
const specs = swaggerJsdoc(swaggerOptions)
require('dotenv').config()

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/faturas", faturaRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`)
})
