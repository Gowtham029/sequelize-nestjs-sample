NestJs-Sequelize-Boilerplate-Project

## Description

A Basic [NestJs](https://github.com/nestjs/nest) - [Sequelize](https://sequelize.org/master/index.html) starter repository Which Included Basic JWT authetication, Global Exception Handling, Winston Logger.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production build
$ npm run build
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Docker 

#### Build Image
```
docker build . -t starter-api
```

#### Run as Container
```
docker run -p 3000:3000 -d --name starter-api starter-api
```


