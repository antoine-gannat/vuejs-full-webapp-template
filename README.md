# template-webapp

A VueJs/NodeJs app.

# Requirements

- [NodeJS 12 or later](https://nodejs.org/en/download/)
- [Docker and docker-compose](https://www.docker.com/) (Optional)

# Usage

Run these commands at the root of the project

## Basics

First install node dependencies

    npm i

Then rename the project (mendatory to work with the [environment variables](#Environment-variables))

    npm run rename "my-new-name"

_replace 'my-new-name' with the name of your project_


## Run

### In Development mode

    npm run serve

### In Production mode **with** docker

    docker-compose up

### In Production mode **without** docker

You **must** host the database present in **data/mysql** first.

    npm run build
    node build/server.js


# Environment variables

For the project to work properly, you need to set the following variables :

- ``project_name``_DB_HOST
    
    This is the url of the database (ex: localhost or 127.0.0.1)
- ``project_name``_DB_USERNAME

    The username you want to use to connect to your database.
- ``project_name``_DB_PASSWORD

    The password that goes with the username above.
- ``project_name``_DB_NAME

    The name of your database (should be ``project_name`` by default)

- ``project_name``_JWT_PASSWORD

    The password used to generate the authentication tokens.

``project_name`` being the name of your project. It can be set using ``npm run rename``.


# Technologies

## Webapp

- VueJS
- Bootstrap 4

## Server

- NodeJS
- Typescript

## Database

- MySQL
- PHPMyAdmin
