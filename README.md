# Auth Service Microservice

This is a microservice responsible for user authentication, built using Node.js, MySQL, Docker, and Minikube. The service provides APIs for user registration, login, JWT token management (verification, refresh), and scaling via Docker or Kubernetes.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Endpoints](#endpoints)
  - [Sign Up (`/signup`)](#sign-up)
  - [Login (`/login`)](#login)
  - [Verify Token (`/verifyToken`)](#verify-token)
  - [Refresh Token (`/refreshToken`)](#refresh-token)
- [Authorization](#authorization)
- [Scaling with Docker and Minikube](#scaling-with-docker-and-minikube)
- [Run with Docker](#run-with-docker)
- [Run with Minikube](#run-with-minikube)

## Prerequisites

- **Node.js** (v14 or later)
- **MySQL** (v8.0)
- **Docker** (v20.x or later)
- **Minikube** (for Kubernetes scaling)

Ensure that you have the following installed:
- Docker Desktop or Docker Engine
- Minikube (if you plan to use Kubernetes for scalability)

## You can also pull the Docker image directly from Docker Hub:  

```bash
docker pull mitesh2110/authimage:1.0.1
```

## Installation

Fireup the database either in docker container or in local mysql server

0.1 IN LOCAL SQL SERVER

```sql
create database auth;
   
use auth;

create table users(
    uid int auto_increment primary key,
    uname varchar(10) not null,
    email varchar (30) not null unique,
    password varchar (255) not null,
    created_at timestamp default current_timestamp);
```

0.2 IN DOCKER CONTAINER
In docker container you just need to run the docker-compose file and it create and fire up the container.

```bash
docker-compose up
```
###### Note: You can only run the above command when you have cloned the repo into your local machine.

##### Now we have our database setup.

### Running Locally

1. Clone the repository:

```bash
git clone https://github.com/miteshp2110/AuthService.git
```
2. Change Directory

```bash
cd .\AuthService\
```

3. Install Dependencies

```bash
npm install
```

### If you are running on just node server then you need to setup environment variables using .env file

4. Setup .env files with following data

```bash
MYSQL_HOST=localhost
MYSQL_DIALECT=mysql
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=root
MYSQL_DB=auth
JWT_SECERET=SampleSeceretKey
```

5. Run the Node Server

```bash
npm start
```

## Running With Docker

1. Build Docker Image (if not pull from [DockerHub](#you-can-also-pull-the-docker-image-directly-from-docker-hub))
```bash
docker build -t authimage:latest .
```

## Setting Up Minikube Pods

```bash
cd manifest
```
```bash
kubectl apply -f ./
```
## Access the minukube services via

```bash
minikube service auth-service
```

## Endpoints

### 1. **Sign Up (`/signup`)**

- **Method**: `POST`
- **Description**: Registers a new user with email, username, and password.
- **Request Body**:
```json
 {
    "email": "user@example.com",
    "username": "user123",
    "password": "password123"
  }
```
- **Response:**
    - **201 Created** : User successfully registerd.
    - **409 Conflict** : Email Already exists.


### 2. **Login (`/login`)**

- **Method**: `POST`
- **Description**: Logs in a user and returns a JWT.

- **Request Body**:
```json
 {
    "email": "user@example.com",
    "password": "password123"
  }
```
- **Response:**
    - **201 Created** : JWT token and refresh token.
    - **401 Unauthorized** : Incorrect email or password.


- **Response Body**
```json
{
    "message": "Correct Credentials",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE3MjYwNDY2ODEsImV4cCI6MTcyNjEzMzA4MX0.z9PhJrJrm8ASikKANRQbLtaBLIl4a6d_EgaAnohtC_Q",
    "username": "Mitesh21"
}
```


### 3. **Verify Token (`/verifyToken`)**

- **Method**: `GET`
- **Description**: Verifies the validity of a JWT token.

- **Request Body**:
```json
 {
    "Authorization": "Bearer <JWT_TOKEN>"
  }
```
- **Response:**
    - **200 Created** : JWT token is valid.
    - **401 Unauthorized** : Token is invalid or Expired.



### 4. **Refresh Token (`/refreshToken`)**

- **Method**: `POST`
- **Description**: Give a new Token in exchange of expired token.

- **Request Body**:
```json
 {
    "email":"testemail@gmail.com",
    "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RlbWFpbEBnbWFpbC5jb20iLCJpYXQiOjE3MjU5OTQxNjksImV4cCI6MTcyNTk5NDIyOX0.Bhv_6re7pRnEKrqbsa4EaCe5dunFvo3ps5mgkNqu5VE"
  }
```
- **Response:**
    - **200 Ok** : New Token.
    - **403 Unauthorized** : Invalid Token.


