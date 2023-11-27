const mysql = require("mysql2");

const pool = mysql
  .createPool({
    host: "localhost",
    user: "root",
    password: "Codenotch1232",
    database: "Proyecto_bdd",
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    queueLimit: 0,
  })
  .promise();

console.log("Conectado a la base de datos");

module.exports = pool;
