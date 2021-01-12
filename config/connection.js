// 1. Require your needed libraries
const mysql = require('mysql');

// 2. Create your connection
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  // NOTE: Be sure to add your MySQL password here!
  password: 'sql123456789',
  database: 'employeeManagerDB',
});

// 3. Instantiate your connection

connection.connect((err) => {
  if (err) {
    console.error(`error connecting: ${err.stack}`);
    return;
  }
  console.log(`
  ________________________
 |                        |
 |    Employee Manager    |
 |                        |
 '------------------------'
 `);

});

module.exports = connection;
