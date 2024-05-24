const express =  require("express")
const cors =  require("cors")
const faturaRoutes = require("./src/routes/fatura.routes")
const swaggerJsdoc = require("swagger-jsdoc")
const bodyParser = require('body-parser');
const swaggerOptions =  require("./swaggerConfig")
const swaggerUi = require("swagger-ui-express")
const app = express()
const specs = swaggerJsdoc(swaggerOptions)
require('dotenv').config()
const PORT = process.env.PORT || 3000;


const customCss = `
.swagger-ui .topbar {
  background-color: #12312a; 
}
.swagger-ui .opblock-summary-path {
  font-size: 18px;
  color: #333;
}
.swagger-ui .opblock.opblock-get {
  background: #00dc77; 
  border-color: none;
}
.body {
  background: #FDFDFD;
}
.swagger-ui .scheme-container {
  background: #FDFDFD;
}
.swagger-ui .opblock.opblock-get .opblock-summary-method {
  background: #12312a;
}
.swagger-ui .opblock.opblock-get .opblock-summary {
  border-color: none;
}
.swagger-ui .info .title {
  font-size: 32px;
  font-weight: 700;
  color: #12312a;
}
.swagger-ui .servers>label select {
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 0px;
  margin-bottom: 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: sans-serif;
  color: #2C3E50;
  font-size: 14px;
 }
.swagger-ui .response-col_status .response-col_description {
  color: #007bff; /* Blue */
}
.swagger-ui .responses-inner .response-body {
  border: 1px solid #ccc;
  border-radius: 5px;
}
`;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse requests of content-type - application/json
app.use(bodyParser.json());

const options = { customCss, customCssUrl: '/public/swagger-ui.css', customSiteTitle: "Teste LUMI API - Swagger"};
app.use("/api-doc", swaggerUi.serve, swaggerUi.setup(specs, options))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/faturas", faturaRoutes)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

module.exports = app;