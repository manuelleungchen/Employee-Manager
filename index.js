// 1. Require your needed libraries
const mysql = require("mysql");
const inquirer = require("inquirer");

// * Add departments, roles, employees

// * View departments, roles, employees

// * Update employee roles

// 2. Create your connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "sql123456789",
    database: "employeeManagerDB"
});

// This function start the employee manager application.
const start = () => {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Employees By Department',
            'View All Employees By Manager',
            'Add Employee',
            'Remove Employee',
            'Update Employee Role',
            'Update Employee Manager',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department',
            'exit',
        ],
        loop: false

    })
}

// 3. Instantiate your connection
connection.connect((err) => {
    if(err) throw err;
    console.log(`
 ________________________
|                        |
|    Employee Manager    |
|                        |
'------------------------'
`);
start();
})

// 4. End the connection
connection.end();