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

SELECT role.title AS Title, salary AS Salary, department.name AS Department FROM role INNER JOIN department ON role.department_id = department.id ORDER BY title ASC;

SELECT name AS Department FROM department ORDER BY Department ASC;

SELECT department.id AS ID, department.name AS Department, SUM(salary) AS Budget FROM role INNER JOIN department 
ON role.department_id = department.id GROUP BY (department_id) ORDER BY Department;

SELECT * FROM role ORDER BY title ASC;

SELECT id, CONCAT(first_name, ' ' ,  last_name) AS Manager FROM employee ORDER BY Manager ASC;


