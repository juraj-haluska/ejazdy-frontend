# EjazdyFrontend

Frontend in Angular for semestral thesis eJazdy. Backend and 
instructions how to run it can be found in this repo [ejazdy-backend](https://github.com/spacive/ejazdy-backend).

## Description of the semestral thesis

eJazdy is a registration system of rides for car driving school. In the system, there are three
roles of users: Administrator, Instructor and Student. A basic principle of the system lies in 
the ability of instructor to create and publish dates of rides, which students are allowed to register on.
Removal of the registered student to the ride is allowed to Administrators and Instructors without restrictions.
Students are allowed to cancel their registration no later than 24 hours before the lesson starts. The most important
role of the Administrator is user management - create/delete student or instructor from system. Creation of the new user
is accomplished by email invitation which is sent with auto-generated password. Invited user is required to fill the personal 
data and change the password when it is logged in the first time. Administrator is also allowed to register existing
students to lessons, which were published by Instructor.

### Utilised technologies
- Spring Boot
- Amazon Cognito
- Amazon DynamoDBs
- Angular5

### Docs
Documentation in can be found here [ejazdy-backend](https://github.com/spacive/ejazdy-backend) in a directory
[docs](https://github.com/spacive/ejazdy-backend/tree/master/docs). 

## Installation and execution
Requirements to execute a frontend
- Node.js

1. Clone this repo
```
git clone [repo_url]
cd ejazdy-frontend
```

2. Install node modules
```
npm install
```
3. Install angular cli
```
npm install -g @angular/cli
```
4. Execute web server
```
ng serve
```
Web should be accessible at **localhost:4200**. If this port is already occupied,
you can select other one with `--port [port]`

## Possible issues
If you changed setting for backend and it's running on other port,
it is neccessary to edit file enviroment.ts
```
apiBaseUrl = 'http://localhost:[port]'
```

## Author
Juraj Haluška (https://github.com/spacive)
