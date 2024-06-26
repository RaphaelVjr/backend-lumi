const swaggerDefinition = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Invoice: {
          type: "object",
          properties: {
            id: { type: "integer" },
            numero_cliente: { type: "string" },
            mes_referencia: { type: "string" },
            energia_eletrica_quantidade: { type: "number" },
            energia_eletrica_valor: { type: "number" },
            energia_scee_quantidade: { type: "number" },
            energia_scee_valor: { type: "number" },
            energia_compensada_quantidade: { type: "number" },
            energia_compensada_valor: { type: "number" },
            contrib_ilum_publica: { type: "number" }
          }
        }
      }
    },
    info: {
      title: "Express API Lumi",
      version: "1.0.0",
      description: "Extração, gerenciamento e demonstração de dados.",
      contact: {
        name: "Raphael VItório",
        email: "contatoraphaelvjr@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      },
      {
        url: "https://backend-lumi.vercel.app",
        description: "Production server"
      }
    ]
  };
  
  const options = {
    swaggerDefinition,
    apis: ["./src/routes/invoice.routes.js", "./src/routes/otherRoute.routes.js"]
  };

module.exports = options;