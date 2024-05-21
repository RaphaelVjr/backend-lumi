const swaggerDefinition = {
    openapi: "3.0.0",
    components: {
      schemas: {
        Fatura: {
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
      title: "Teste Lumi API",
      version: "1.0.0",
      description: "API para gerenciamento de faturas de energia elétrica"
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local server"
      }
    ]
  };
  
  const options = {
    swaggerDefinition,
    apis: ["./routes/index.js"]
  };

module.exports = options;