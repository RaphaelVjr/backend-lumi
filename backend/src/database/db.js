const pgp = require('pg-promise')();

const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'postgres',
    user: 'postgres',
    password: '151176'
});

const connectDatabase = () => {
    return db.connect()
}


async function insertFatura(cliente, mesReferencia, energiaEletrica, energiaSCEEE, energiaCompensada, contribIlumPublica) {
    const res = await client.query('INSERT INTO faturas VALUES($1, $2, $3, $4, $5, $6)', [cliente, mesReferencia, energiaEletrica, energiaSCEEE, energiaCompensada, contribIlumPublica]);
    return res;
}

module.exports = { connectDatabase, insertFatura };