const path = require("path");
const bunyan = require("bunyan");
require("dotenv").config();

const pjs = require("../../package.json");

// Get some meta info from the package.json
const { name, version } = pjs;

// Set up a logger
const getLogger = (serviceName, serviceVersion, level) =>
  bunyan.createLogger({ name: `${serviceName}:${serviceVersion}`, level });

const common = {
  db: process.env.DB,
  port: process.env.PORT,
  jwt: process.env.JWT,
  redisport: process.env.REDIS_PORT,
  redisauth: process.env.REDIS_AUTH,
  data: {},
};

module.exports = {
  development: {
    ...common,
    log: () => getLogger(name, version, "debug"),
  },
  production: {
    ...common,
    log: () => getLogger(name, version, "info"),
  },
};
