// 1. Require your needed libraries
const inquirer = require("inquirer");
const orm = require('./config/orm.js');

// This function restart the App
function startAppAgain() {
    App.start();
}

// Start App after 1 ms
setTimeout(function () {
    App.start();
}, 100);

const App = {

    // This function start the employee manager application.
    start() {

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
                'Update Employee Role',
                'Update Employee Manager',
                'Remove Employee',
                'Remove Role',
                'Remove Department',
                'Exit',
            ],
            loop: false
        }).then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    orm.viewAllEmployees(startAppAgain);
                    break;
                case 'View All Employees By Department':
                    orm.viewAllEmployeesBy("department", startAppAgain);
                    break;
                case 'View All Employees By Manager':
                    orm.viewAllEmployeesBy("manager", startAppAgain);
                    break;
                case 'View All Roles':
                    orm.viewAllRolesWithDept(startAppAgain);
                    break;
                case 'View All Departments':
                    orm.viewAllDepartment(startAppAgain);
                    break;
                case 'View the total utilized budget by department':
                    orm.viewBudgetByDepartment(startAppAgain);
                    break;
                case 'Add Employee':
                    this.addEmployee();
                    break;
                case 'Add Role':
                    this.addRole();
                    break;
                case 'Add Department':
                    this.addDepartment();
                    break;
                case 'Update Employee Role':
                    this.updateEmployeeRole();
                    break;
                case 'Update Employee Manager':
                    this.updateEmployeeManager();
                    break;
                case 'Remove Employee':
                    this.removeEmployee();
                    break;
                case 'Remove Role':
                    this.removeRole();
                    break;
                case 'Remove Department':
                    this.removeDepartment();
                    break;
                default:
                    // 4. End the connection
                    connection.end();
                    break;
            }
        });
    },

    // This function will add a new employee to employee table
    addEmployee() {

        let roleList = [];
        let managerList = [];

        // Query all roles
        orm.viewAll("role", "title", (roleResponse) => {
            roleResponse.forEach(role => {
                roleList.push(role.title);
            });

            // Query all employees
            orm.viewAllEmployeeFullname((employeeResponse) => {
                employeeResponse.forEach(manager => {
                    managerList.push(manager.Employee);
                });
                managerList.push("No manager");

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
                        if (answer.managerName === employee.Employee) {
                            managerID = employee.id;
                        }
                    });
                    // Insert new employee
                    orm.insertEmployee(answer.firstname, answer.lastname, roleID, managerID, startAppAgain)
                });
            })
        })
    },

    // This function will add a new role to role table
    addRole() {
        orm.viewAll("department", "name", (res) => {
            let departList = [];
            res.forEach(depart => {
                departList.push(depart.name);
            });

            // After querying all departments, prompt the user for which they'd like to add a role
            inquirer.prompt([
                {
                    type: 'rawlist',
                    message: 'Which DEPT would you like to place a new role in?',
                    name: 'departName',
                    choices: departList,
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
                // Insert new role
                orm.insertRole(answer.newRole, answer.salaryRole, departID, startAppAgain);
            })
        })
    },

    // This function will add a new department to department table
    addDepartment() {

        inquirer.prompt([
            {
                name: 'newDepart',
                type: 'input',
                message: 'What is the new Department name?',
            }
        ]).then((answer) => {
            // Insert new dept
            orm.insertDept(answer.newDepart, startAppAgain);
        })
    },

    // This function will update employee's role
    updateEmployeeRole() {

        let employeesList = [];
        let rolesList = [];

        // Query all employees

        orm.viewAllEmployeeFullname((employeesResponse) => {
            employeesResponse.forEach(em => {
                employeesList.push(em.Employee);
            });
            // Query all roles

            orm.viewAll("role", "title", (rolesResponse) => {
                rolesResponse.forEach(role => {
                    rolesList.push(role.title);
                });
                // After querying all roles and employees, prompt the user for new role
                inquirer.prompt([
                    {
                        type: 'rawlist',
                        message: "Which employee would you like to update?",
                        name: 'employeeName',
                        choices: employeesList,
                        loop: false
                    },
                    {
                        type: 'rawlist',
                        message: "What is the new role?",
                        name: 'roleName',
                        choices: rolesList,
                        loop: false
                    }

                ]).then((answer) => {

                    // Get the ID information of the chosen employee and role
                    let employeeID;
                    let roleID;

                    // Loop though each row of the query response and get employee id
                    employeesResponse.forEach(employee => {
                        if (answer.employeeName === employee.Employee) {
                            employeeID = employee.id;
                        }
                    });

                    // Loop though each row of the query response and get role id
                    rolesResponse.forEach(role => {
                        if (answer.roleName === role.title) {
                            roleID = role.id;
                        }
                    });

                    // Insert a new employee with the promp anwsers
                    orm.updateTable("employee", "role_id", roleID, employeeID, startAppAgain)
                });
            });
        });
    },

    // This function will update employee's manager
    updateEmployeeManager() {

        let employeesList = [];
        let managersList = [];

        orm.viewAllEmployeeFullname((employeesResponse) => {
            employeesResponse.forEach(em => {
                employeesList.push(em.Employee);
            });
            inquirer.prompt(
                {
                    type: 'rawlist',
                    message: "Which employee would you like to update?",
                    name: 'employeeName',
                    choices: employeesList,
                    loop: false
                }
            ).then((answer) => {
                let employeeID;

                // Loop though each row of the query response and get employee id
                employeesResponse.forEach(employee => {
                    if (answer.employeeName === employee.Employee) {
                        employeeID = employee.id;
                    }
                });
                // Query all employees except the selected employee to update
                orm.viewAllEmployeesExcept(employeeID, (managersResponse) => {
                    managersResponse.forEach(manager => {
                        managersList.push(manager.Manager);
                    });
                    // After querying all roles and employees, prompt the user for new role
                    inquirer.prompt([
                        {
                            type: 'rawlist',
                            message: "Who is the new manager?",
                            name: 'managerName',
                            choices: managersList,
                            loop: false
                        }

                    ]).then((answer) => {

                        // Get the ID information of the chosen employee and role
                        let managerID;

                        // Loop though each row of the query response and get role id
                        managersResponse.forEach(manager => {
                            if (answer.managerName === manager.Manager) {
                                managerID = manager.id;
                            }
                        });

                        // Insert a new employee with the promp anwsers
                        orm.updateTable("employee", "manager_id", managerID, employeeID, startAppAgain)
                    });
                });
            });
        });
    },

    // This function will remove employee
    removeEmployee() {

        let employeesList = [];

        // Query all employees
        orm.viewAllEmployeeFullname((employeesResponse) => {
            employeesResponse.forEach(em => {
                employeesList.push(em.Employee);
            });
            inquirer.prompt(
                {
                    type: 'rawlist',
                    message: "Which employee would you like to remove?",
                    name: 'employeeName',
                    choices: employeesList,
                    loop: false
                }
            ).then((answer) => {
                let employeeID;

                // Loop though each row of the query response and get employee id
                employeesResponse.forEach(employee => {
                    if (answer.employeeName === employee.Employee) {
                        employeeID = employee.id;
                    }
                });
                // Delete employee based on selected employee id
                orm.deleteRows("employee", employeeID, startAppAgain)
            });
        });
    },

    // This function will remove role
    removeRole() {

        let rolesList = [];

        // Query all role
        orm.viewAll("role", "title", (allRoles) => {
            allRoles.forEach(role => {
                rolesList.push(role.title);
            });
            inquirer.prompt(
                {
                    type: 'rawlist',
                    message: "Which role would you like to remove?",
                    name: 'roleName',
                    choices: rolesList,
                    loop: false
                }
            ).then((answer) => {
                let roleID;

                // Loop though each row of the query response and get role id
                allRoles.forEach(role => {
                    if (answer.roleName === role.title) {
                        roleID = role.id;
                    }
                });
                // Delete a role
                orm.deleteRows("role", roleID, startAppAgain);
            });
        });
    },

    // This function will remove dept
    removeDepartment() {

        let deptList = [];

        // Query all dept
        orm.viewAll("department", "name", (allDept) => {
            allDept.forEach(dept => {
                deptList.push(dept.name);
            });
            inquirer.prompt(
                {
                    type: 'list',
                    message: "Which department would you like to remove?",
                    name: 'deptName',
                    choices: deptList,
                    loop: false
                }
            ).then((answer) => {
                let deptID;

                // Loop though each row of the query response and get dept id
                allDept.forEach(dept => {
                    if (answer.deptName === dept.name) {
                        deptID = dept.id;
                    }
                });
                // Delete department
                orm.deleteRows("department", deptID, startAppAgain);
            });
        });
    }
}

module.exports = App;
