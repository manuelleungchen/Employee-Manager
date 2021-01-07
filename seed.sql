
INSERT INTO department (name) VALUES ("Sales"), ("Finance"), ("Engineering"), ("Legal");

INSERT INTO role (title, salary, department_id) VALUES 
("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1), 
("Lead Engineer", 150000, 3), 
("Software Engineer", 120000, 3),
("Account Manager", 130000, 2),
("Accountant", 125000, 2),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES 
("Jessie", "Thompsom", 1),
("Ashley", "Rodriguez", 3),
("Sarah", "Lourd", 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Mike", "Chan", 2, 1),
("Kevin", "Tipuk", 4, 3);


DROP DATABASE IF EXISTS employeeManagerDB;

CREATE DATABASE employeeManagerDB;

USE employeeManagerDB;

CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY (id)
);
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) ,
    salary DECIMAL(6,2),
    department_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT DEFAULT null,
    PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id)
);

SELECT first_name FROM employee WHERE id = 3;
SELECT CONCAT(employee.first_name, ' ' ,  employee.last_name) AS manager FROM employee LEFT JOIN employee e ON e.id = employee.manager_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, employee.manager_id FROM 
(employee INNER JOIN role ON employee.role_id = role.id)
INNER JOIN department ON role.department_id = department.id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
CONCAT(manager.first_name, ' ' ,  manager.last_name) AS manager  
FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;


SELECT CONCAT(manager.first_name, ' ' ,  manager.last_name) AS manager 
FROM employee INNER JOIN employee manager ON manager.id = employee.manager_id;

FROM (employee INNER JOIN role ON employee.role_id = role.id)
INNER JOIN department ON role.department_id = department.id;


SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS Department, role.salary, 
CONCAT(employee.first_name, ' ' ,  employee.last_name) AS manager FROM employee LEFT JOIN employee e ON e.id = employee.manager_id 
LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id ORDER BY ID ASC;






INSERT INTO department (name) VALUES ("Sales"), ("Finance"), ("Engineering"), ("Legal");

INSERT INTO role (title, salary, department_id) VALUES 
("Sales Lead", 100000, 1), 
("Salesperson", 80000, 1), 
("Lead Engineer", 150000, 3), 
("Software Engineer", 120000, 3),
("Account Manager", 130000, 2),
("Accountant", 125000, 2),
("Legal Team Lead", 250000, 4),
("Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id) VALUES 
("Jessie", "Thompsom", 1),
("Ashley", "Rodriguez", 3),
("Sarah", "Lourd", 7);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("Mike", "Chan", 2, 1),
("Kevin", "Tipuk", 4, 3);


SELECT employee.id AS ID, employee.first_name AS Firstname, employee.last_name AS Lastname, role.title AS Title, department.name AS Department, role.salary AS Salary, 
CONCAT(manager.first_name, ' ' ,  manager.last_name) AS Manager  
FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;

SELECT employee.id AS ID, employee.first_name AS Firstname, employee.last_name AS Lastname, role.title AS Title, department.name AS Department, role.salary AS Salary, 
CONCAT(manager.first_name, ' ' ,  manager.last_name) AS Manager  
FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY department ASC;

SELECT employee.id AS ID, employee.first_name AS Firstname, employee.last_name AS Lastname, role.title AS Title, department.name AS Department, role.salary AS Salary, 
CONCAT(manager.first_name, ' ' ,  manager.last_name) AS Manager  
FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY manager ASC;

SELECT title AS Title, salary AS Salary, department.name AS Department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC;

SELECT name AS Department FROM department ORDER BY Department ASC;




