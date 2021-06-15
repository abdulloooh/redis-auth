const router = require("express").Router();

const usersRoute = require("./usersRoute");

import Users from "../controllers/Users";

module.exports = () => {
  router.get("/", async (req, res, next) => {
    return `<h3>Bonjour</h3>`;
  });

  router.use("/users", usersRoute(Users));

  return router;
};
