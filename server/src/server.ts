import * as Fastify from 'fastify';
import logger from './logger';
import * as openapiGlue from "fastify-openapi-glue";
import service from './service';

const options = {
    specification: `${__dirname}/openapi.yaml`,
    service: service,
    prefix: 'api'
};
const port = 4000;

let fastify = Fastify();

// Register swagger
fastify.register(openapiGlue, options);

// Set the logger
fastify.use(logger);

// Start the server
fastify.listen(port, "0.0.0.0", (err, address) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("Server listening on address", address);
});