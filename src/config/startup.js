const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const compression = require("compression");

module.exports = function (app, config) {
  const log = config.log();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(
    cors({
      origin: ["*"],
    })
  );

  if (app.get("env") === "development") {
    app.use((req, res, next) => {
      // log server requests in dev
      log.debug(`${req.method}:${req.url}`);
      return next();
    });
  } else {
    app.use(helmet());
    app.use(compression());
  }
/*
  if (!config.jwt) {
    throw new Error("jwt key not found");
  }
*/
  if (!config.db) {
    throw new Error("db not configured");
  }
};
