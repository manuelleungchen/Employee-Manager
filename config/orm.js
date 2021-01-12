const connection = require('./connection.js');

// Object Relational Mapper (ORM)

// The ?? signs are for swapping out table or column names
// The ? signs are for swapping out other values
// These help avoid SQL injection
// https://en.wikipedia.org/wiki/SQL_injection

const orm = {

    viewAllEmployees(cb) {
        const queryString = `SELECT employee.id AS ID, employee.first_name AS Firstname, employee.last_name AS Lastname, 
    role.title AS Title, department.name AS Department, role.salary AS Salary, 
    CONCAT(manager.first_name, ' ' ,  manager.last_name) AS Manager  
    FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
    ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;`;

        connection.query(
            queryString,
            (err, result) => {
                if (err) throw err;
                console.table(result);
                cb();
            }
        );
    },

    // This function will query and display all employees BY Dept name
    viewAllEmployeesBy(filterCol, cb) {
        const query = `SELECT employee.id AS ID, employee.first_name AS Firstname, employee.last_name AS Lastname,
    role.title AS Title, department.name AS Department, role.salary AS Salary, 
    CONCAT(manager.first_name, ' ' ,  manager.last_name) AS Manager 
    FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
    ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id 
    ORDER BY ${filterCol} ASC;`;
        const callBack = (err, res) => {
            if (err) throw err;
            console.table(res);
            cb();
        }
        connection.query(query, callBack);
    },

    // This function will query and display all Roles
    viewAllRolesWithDept(cb) {
        const query = `SELECT role.id AS ID, title AS Title, salary AS Salary, department.name AS Department 
    FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC;`;
        const callBack = (err, res) => {
            if (err) throw err;
            console.table(res);
            cb();
        }
        connection.query(query, callBack);
    },

    // This function will query and display all Department
    viewAllDepartment(cb) {
        const query = `SELECT id AS ID, name AS Department FROM department ORDER BY Department ASC;`;
        const callBack = (err, res) => {
            if (err) throw err;
            console.table(res);
            cb();
        }
        connection.query(query, callBack);
    },

    // This function will query and display budget by Department
    viewBudgetByDepartment(cb) {
        const query = `SELECT department.id AS ID, department.name AS Department, SUM(salary) AS Budget 
    FROM role INNER JOIN department ON role.department_id = department.id GROUP BY (department_id) 
    ORDER BY Department;`;
        const callBack = (err, res) => {
            if (err) throw err;
            console.table(res);
            cb();
        }
        connection.query(query, callBack);
    },

    // This function will query all based on table and col parameters
    viewAll(tableName, colName, cb) {
        const query = `SELECT * FROM ${tableName} ORDER BY ${colName} ASC;`;
        const callBack = (err, result) => {
            if (err) throw err;
            cb(result);
        }
        connection.query(query, callBack);
    },

    // This function will query all employees full name except one
    viewAllEmployeeFullname(cb) {
        const query = `SELECT id, CONCAT(first_name, ' ' ,  last_name) AS Employee FROM employee ORDER BY Employee ASC;`;
        const callBack = (err, result) => {
            if (err) throw err;
            cb(result);
        }
        connection.query(query, callBack);
    },

    // This function will query all employees full name except one
    viewAllEmployeesExcept(employeeID, cb) {
        const query = `SELECT id, CONCAT(first_name, ' ' ,  last_name) AS Manager 
        FROM employee WHERE id != ${employeeID} ORDER BY Manager ASC;`;
        const callBack = (err, result) => {
            if (err) throw err;
            cb(result);
        }
        connection.query(query, callBack);
    },

    // Insert a new employee with the promp anwsers
    insertEmployee(firtname, lastname, roleId, managerId, cb) {
        connection.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
        (?, ?, ?, ?);`,
            [
                firtname, lastname, roleId, managerId
            ],
            (err, res) => {
                if (err) throw err;
                console.log(`Added ${firtname} ${lastname} Successfully!`);
                cb();
            }
        )
    },

    // Insert Role
    insertRole(title, salary, department_id, cb) {
        connection.query(
            'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?);',
            [
                title, salary, department_id
            ],
            (err, res) => {
                if (err) throw err;
                console.log(`New Role Added Successfully!`);
                cb();
            }
        );
    },

    // Insert Department
    insertDept(name, cb) {
        connection.query(
            'INSERT INTO department (name) VALUES (?);',
            [
                name
            ],
            (err, res) => {
                if (err) throw err;
                console.log(`New DEPT Added Successfully!`);
                cb();
            }
        );
    },

    // This will update rows on a particular table
    updateTable(tableName, colName, colValue, idValue, cb) {
        connection.query(
            `UPDATE ?? SET ?? = ? WHERE id = ?;`,
            [
                tableName, colName, colValue, idValue
            ],
            (err, res) => {
                if (err) throw err;
                console.log(`Table Updated Successfully!`);
                cb();
            }
        );
    },

    // This will delete rows on a particular table
    deleteRows(tableName, colFilter, cb) {
        connection.query(
            `DELETE FROM ${tableName} WHERE id = ${colFilter};`,
            (err, res) => {
                if (err) throw err;
                console.log(`Data was deleted!`);
                cb();
            }
        )
    }
};

module.exports = orm;
