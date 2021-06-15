const router = require("express").Router();

const usersRouter = require("./usersRoute");

import Users from "../controllers/Users";

module.exports = (config) => {
  const userController = new Users(config);

  router.get("/", async (req, res, next) => {
    return res.send(`<h3>Bonjour</h3>`);
  });

  router.use("/users", usersRouter(userController));

  return router;
};
