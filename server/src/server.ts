import * as Fastify from 'fastify';
import * as openapiGlue from "fastify-openapi-glue";
import * as path from 'path';
import logger from './logger';
import service from './service';
import database from './database';

database.connect();

// Set the swagger options
const options = {
    specification: `${__dirname}/openapi.yaml`,
    service: service,
    prefix: 'api'
};
// Set the port
const port = Number(process.env.PORT) || 4000;

let fastify = Fastify();

// Register a static route to serve the client
const staticFolder = path.join(__dirname, '../client-dist');
console.log("Serving from-end from folder: ", staticFolder);

fastify.register(require('fastify-static'), {
    root: staticFolder
})

// Register swagger with openapiglue
fastify.register(openapiGlue, options);

// Set the logger
fastify.use(logger);

// Start the server
fastify.listen(port, "0.0.0.0", (err, address) => {
    if (err) {
        console.error(err.message);
        return;
    }
    console.log("Server listening on address", address);
});