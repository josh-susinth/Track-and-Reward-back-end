const Pool=require("pg").Pool;

const pool = new Pool({
    user:"jbaeomiywbkqbk",
    password: "18c912f3fe7875efc863802b62ed7be5241e38dc8211557ca948e673d7e0a460",
    database: "d2e9vh0jej4ej0",
    host:"ec2-54-162-211-113.compute-1.amazonaws.com",
    port: 5432,
    ssl: {
    rejectUnauthorized: false
    }
});

module.exports = pool;
pool.connect();