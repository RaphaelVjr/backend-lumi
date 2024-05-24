const { Pool } = require('pg');


const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  })

pool.connect((err) =>{
    if (err) throw err
})


async function insertFatura(cliente, mesReferencia, energiaEletrica, energiaSCEEE, energiaCompensada, contribIlumPublica) {
    const res = await client.query('INSERT INTO faturas VALUES($1, $2, $3, $4, $5, $6)', [cliente, mesReferencia, energiaEletrica, energiaSCEEE, energiaCompensada, contribIlumPublica]);
    return res;
}

module.exports = { pool, insertFatura };