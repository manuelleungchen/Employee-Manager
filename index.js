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
            'View All Roles',
            'View All Departments',
            'View the total utilized budget by department',
            'Add Employee',
            'Add Role',
            'Add Department',
            'Remove Employee',
            'Remove Role',
            'Remove Department',
            'Update Employee Role',
            'Update Employee Manager',
            'Exit',
        ],
        loop: false
    }).then((answer) => {
        switch (answer.action) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Employees By Department':
                viewAllEmployeesByDepartment();
                break;
            case 'View All Employees By Manager':
                viewAllEmployeesByManager();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'View All Departments':
                viewAllDepartment();
                break;
            case 'View the total utilized budget by department':
                viewBudgetByDepartment();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Remove Employee':
                removeEmployee();
                break;
            case 'Remove Role':
                removeRole();
                break;
            case 'Remove Department':
                removeDepartment();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Update Employee Manager':
                updateEmployeeManager();
                break;
            default:
                // 4. End the connection
                connection.end();
                break;
        }
    })
}

// This function will query and display all employees
const viewAllEmployees = () => {
    const query = `SELECT employee.id AS ID, employee.first_name AS Firstname, employee.last_name AS Lastname, 
    role.title AS Title, department.name AS Department, role.salary AS Salary, 
    CONCAT(manager.first_name, ' ' ,  manager.last_name) AS Manager  
    FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
    ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`;
        const callBack = (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
        connection.query(query, callBack);
}

// This function will query and display all employees
const viewAllEmployeesByDepartment = () => {
    const query = `SELECT employee.id AS ID, employee.first_name AS Firstname, employee.last_name AS Lastname,
    role.title AS Title, department.name AS Department, role.salary AS Salary, 
    CONCAT(manager.first_name, ' ' ,  manager.last_name) AS Manager 
    FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
    ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id 
    ORDER BY department ASC;`;
        const callBack = (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
        connection.query(query, callBack);
}

// This function will query and display all employees
const viewAllEmployeesByManager = () => {
    const query = `SELECT employee.id AS ID, employee.first_name AS Firstname, employee.last_name AS Lastname, 
    role.title AS Title, department.name AS Department, role.salary AS Salary, 
    CONCAT(manager.first_name, ' ' ,  manager.last_name) AS Manager 
    FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
    ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id 
    ORDER BY manager ASC;`;
        const callBack = (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
        connection.query(query, callBack);
}

const viewAllRoles = () => {
    const query = `SELECT title AS Title, salary AS Salary, department.name AS Department 
    FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC;`;
        const callBack = (err, res) => {
            if (err) throw err;
            console.table(res);
            start();
        }
        connection.query(query, callBack);
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

