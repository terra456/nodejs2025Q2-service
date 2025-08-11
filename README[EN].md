# Home Library Service

REST-server with Nestjs and typescript. Users can create, read, update, delete data about Artists, Tracks and Albums, add them to Favorites in their own Home Library!
Data stored in PostgreSQL and include Prisma to communicate with your database.
Application builded and run multi-container using Docker.
Also implemented Authentication and Authorization with JWT (Access and Refresh tokens).

## Detaild description

[REST Service](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/rest-service/assignment.md)

[Containerization, Docker and Database & ORM](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/containerization-database-orm/assignment.md)

[Logging & Error Handling and Authentication and Authorization](https://github.com/AlreadyBored/nodejs-assignments/blob/main/assignments/logging-error-authentication-authorization/assignment.md)

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone git@github.com:terra456/nodejs2025Q2-service.git
```

## Rename .env.example

```
cp .env.example .env
```

## Build docker image

```
docker compose -f docker-compose.yml up --build -d
```

Server is avaliable http://localhost:4000

After starting the app on port (4000 as default) you can open
in your browser OpenAPI (with swagger) documentation by typing http://localhost:4000/doc/.

Logs are stored at folder server_data.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
