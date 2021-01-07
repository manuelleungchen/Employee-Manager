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

// This function will query and display all employees BY Dept name
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

// This function will query and display all employees BY Manager name
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

// This function will query and display all Roles
const viewAllRoles = () => {
    const query = `SELECT role.id AS ID, title AS Title, salary AS Salary, department.name AS Department 
    FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC;`;
    const callBack = (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    connection.query(query, callBack);
}

// This function will query and display all Department
const viewAllDepartment = () => {
    const query = `SELECT id AS ID, name AS Department FROM department ORDER BY Department ASC;`;
    const callBack = (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    connection.query(query, callBack);
}

// This function will query and display budget by Department
const viewBudgetByDepartment = () => {
    const query = `SELECT department.id AS ID, department.name AS Department, SUM(salary) AS Budget 
    FROM role INNER JOIN department ON role.department_id = department.id GROUP BY (department_id) 
    ORDER BY Department;`;
    const callBack = (err, res) => {
        if (err) throw err;
        console.table(res);
        start();
    }
    connection.query(query, callBack);
}

// This function will add a new employee to employee table
const addEmployee = () => {

    let roleList = [];
    let managerList = [];

    connection.query(
        // Query all roles
        'SELECT * FROM role ORDER BY title ASC;',
        (err, roleResponse) => {
            if (err) throw err;
            roleResponse.forEach(role => {
                roleList.push(role.title);
            });
            connection.query(
                // Query all employees
                "SELECT id, CONCAT(first_name, ' ' ,  last_name) AS Manager FROM employee ORDER BY Manager ASC;",
                (err, employeeResponse) => {
                    if (err) throw err;

                    employeeResponse.forEach(manager => {
                        managerList.push(manager.Manager);
                    });
                    // After querying all roles and employees, prompt the user for new employee info
                    inquirer.prompt([
                        {
                            name: 'firstname',
                            type: 'input',
                            message: "What is the employee's first name?",
                        },
                        {
                            name: 'lastname',
                            type: 'input',
                            message: "What is the employee's last name?",
                        },
                        {
                            type: 'rawlist',
                            message: "What is the employee's role?",
                            name: 'roleName',
                            choices: roleList,
                            loop: false
                        },
                        {
                            type: 'rawlist',
                            message: "Who is the employee's manager?",
                            name: 'managerName',
                            choices: managerList,
                            loop: false
                        }

                    ]).then((answer) => {

                        // Get the ID information of the chosen role and manager
                        let roleID;
                        let managerID;

                        // Loop though each row of the query response and get role id
                        roleResponse.forEach(role => {
                            if (answer.roleName === role.title) {
                                roleID = role.id;
                            }
                        });
                        // Loop though each row of the query response and get manager id
                        employeeResponse.forEach(employee => {
                            if (answer.managerName === employee.Manager) {
                                managerID = employee.id;
                            }
                        });

                        // Insert a new employee with the promp anwsers
                        connection.query(
                            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
                            (?, ?, ?, ?);`,
                            [
                                answer.firstname, answer.lastname, roleID, managerID
                            ],
                            (err, res) => {
                                if (err) throw err;
                                console.log(`Added ${answer.firstname} ${answer.lastname} Successfully!`);
                                start();
                            }
                        );
                    })
                }
            );
        }
    );
}



// This function will add a new role to role table
const addRole = () => {
    const query = `SELECT * FROM department ORDER BY name ASC;`;
    const callBack = (err, res) => {
        if (err) throw err;

        // After querying all departments, prompt the user for which they'd like to add a role
        inquirer.prompt([
            {
                type: 'rawlist',
                message: 'Which DEPT would you like to place a new role in?',
                name: 'departName',
                choices() {
                    let departList = [];
                    res.forEach(depart => {
                        departList.push(depart.name);
                    });
                    return departList;
                },
                loop: false
            },
            {
                name: 'newRole',
                type: 'input',
                message: 'What is the new role?',
            },
            {
                name: 'salaryRole',
                type: 'number',
                message: 'What is the salary?',
            }
        ]).then((answer) => {
            // Get the information of the chosen depart
            let departID;
            res.forEach(depart => {
                if (answer.departName === depart.name) {
                    departID = depart.id;
                }
            });
            connection.query(
                'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);',
                [
                    answer.newRole, answer.salaryRole, departID
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log(`New Role Added Successfully!`);
                    start();
                }
            );
        })
    }
    connection.query(query, callBack);
}

// This function will add a new department to department table
const addDepartment = () => {

    inquirer.prompt([
        {
            name: 'newDepart',
            type: 'input',
            message: 'What is the new Department name?',
        }
    ]).then((answer) => {
        connection.query(
            'INSERT INTO department (name) VALUES (?);',
            [
                answer.newDepart
            ],
            (err, res) => {
                if (err) throw err;
                console.log(`New DEPT Added Successfully!`);
                start();
            }
        );
    })
}

// 3. Instantiate your connection
connection.connect((err) => {
    if (err) throw err;
    console.log(`
 ________________________
|                        |
|    Employee Manager    |
|                        |
'------------------------'
`);
    start();
})

