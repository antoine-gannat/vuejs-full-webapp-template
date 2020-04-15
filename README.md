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

Then rename the project

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
