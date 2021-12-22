create database trackreward;

create table employee(
    empid INT GENERATED ALWAYS AS IDENTITY (START WITH 300 INCREMENT BY 1),
    empname VARCHAR(25), 
    designation VARCHAR(25),
    password VARCHAR(25),
    PRIMARY KEY(empid)  
);

 INSERT INTO employee ("empname","designation","password") values ('Abi','Trainee','12345');
 INSERT INTO employee ("empname","designation","password") values ('josh','Trainee','98345');
  INSERT INTO employee ("empname","designation","password") values ('Hemanth','Mentor','19845');
   INSERT INTO employee ("empname","designation","password") values ('Sarva','Manager','09845');

 create table initiative(
    pid INT GENERATED ALWAYS AS IDENTITY (START WITH 5500 INCREMENT BY 1),
    eventname VARCHAR(255) NOT NULL,
    status boolean NOT NULL, 
    description VARCHAR(255)NOT NULL,
    sdate DATE NOT NULL,
    edate DATE NOT NULL,
    PRIMARY KEY(pid) 
);

 create table subscription(
    sid INT GENERATED ALWAYS AS IDENTITY (START WITH 7000 INCREMENT BY 1),
    empid INT, 
    pid INT,
    PRIMARY KEY(sid),
    CONSTRAINT fk_empid  
    FOREIGN KEY(empid)   
    REFERENCES employee(empid),
    CONSTRAINT fk_pid  
    FOREIGN KEY(pid)   
    REFERENCES initiative(pid)   
);

CREATE TABLE Department(  
Department_id INT GENERATED ALWAYS AS IDENTITY,  
Employee_id INT,  
Department_name VARCHAR(200) NOT NULL,  
PRIMARY KEY(Department_id),  
CONSTRAINT fk_Employee  
FOREIGN KEY(Employee_id)   
REFERENCES Employee(Employee_id)  
); 
INSERT INTO initiative ("eventname","status","description","sdate","edate") 
values ('event1','TRUE','description1','2021-12-02','2022-01-20');


INSERT INTO initiative ("eventname","status","description","sdate","edate")
values ('event2','FALSE','description2','2022-01-02','2022-01-29');


INSERT INTO initiative ("eventname","status","description","sdate","edate")
values ('event3','FALSE','description3','2022-01-05','2022-02-05');


INSERT INTO initiative ("eventname","status","description","sdate","edate")
values ('event5','TRUE','description4','2022-02-06','2022-02-19');

INSERT INTO subscription ("empid","pid") values (300,5503);


//SELECT STMTS

 select sid as "SUBSCRIPTION ID",empid as "EMPLOYEE ID", pid as "INITIATIVE ID" from subscription;
 select pid as "INITIATIVE ID",eventname as "INITIATIVE NAME",STATUS as "INITIATIVE STATUS", description AS "DESCRIPTION",SDATE AS "START DATE" ,EDATE AS "END DATE"  from INITIATIVE;
 select EMPID as "EMPLOYEE ID",EMPNAME as "EMPLOYEE NAME",DESIGNATION as "DESIGNATION", password as "PASSWORD"  from EMPLOYEE;