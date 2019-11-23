require('dotenv').config();

const mysql = require('mysql');

const host = process.env.DB_HOST || 'localhost';
const user = process.env.DB_USER || 'root';
const password = process.env.DB_PASSOWRD || '';

const database = process.env.DB_DATABASE || 'diary';
// const connection = mysql.createConnection({
  // host, user, password, database,
// })

// console.log(connection)

module.exports = async () => new Promise((resolve, reject) => {
  const connection = mysql.createConnection({
    host, user, password, database,
  });

  connection.connect(error => {
    if (error) {
      reject(error);
      return;
    }
    resolve(connection);
  })
});