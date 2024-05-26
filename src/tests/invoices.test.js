const request = require('supertest');
const app = require('../../index.js');
const sinon = require('sinon');
const InvoiceService = require('../services/invoices.service.js');

describe('GET /invoices/:id', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('responds with a invoice object when given a valid ID', async () => {
    const { expect } = await import('chai');
    sinon.stub(InvoiceService, 'getInvoiceById').returns({
      id: 1,
      numero_cliente: "7005400387",
      mes_referencia: "JUN/2023",
      energia_eletrica_quantidade: 50,
      energia_eletrica_valor: 43.28,
      energia_scee_quantidade: 1.007,
      energia_scee_valor: 652.55,
      energia_compensada_quantidade: 1.007,
      energia_compensada_valor: -620,
      contrib_ilum_publica: 43.28
    });

    const response = await request(app)
      .get('/invoices/1')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body).to.deep.equal({
      id: 1,
      numero_cliente: "7005400387",
      mes_referencia: "JUN/2023",
      energia_eletrica_quantidade: 50,
      energia_eletrica_valor: 43.28,
      energia_scee_quantidade: 1.007,
      energia_scee_valor: 652.55,
      energia_compensada_quantidade: 1.007,
      energia_compensada_valor: -620,
      contrib_ilum_publica: 43.28
    });
  });

  it('responds with 404 when given an invalid ID', async () => {
    const { expect } = await import('chai');
    sinon.stub(InvoiceService, 'getInvoiceById').returns(null);

    const response = await request(app)
      .get('/invoices/999')
      .expect('Content-Type', /json/)
      .expect(404);
      
    const expectedErrorMessage = 'Invoice não encontrada com o ID: 999';
    expect(response.body.error.errorMessage).to.equal(expectedErrorMessage);
  });
});

describe('GET /invoices', () => {
  it('responds with json', () => {
    return request(app)
      .get('/invoices')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        if (!Array.isArray(res.body)) {
          throw new Error('Response body is not an array');
        }
      });
  });
});