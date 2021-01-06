
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


SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
CONCAT(manager.first_name, ' ' ,  manager.last_name) AS manager  
FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
CONCAT(manager.first_name, ' ' ,  manager.last_name) AS manager  
FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY department ASC;

SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, 
CONCAT(manager.first_name, ' ' ,  manager.last_name) AS manager  
FROM (employee INNER JOIN role ON employee.role_id = role.id) INNER JOIN department 
ON role.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id ORDER BY manager ASC;



