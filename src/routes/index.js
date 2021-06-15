const router = require("express").Router();

const usersRouter = require("./usersRoute");

import Users from "../controllers/Users";

module.exports = () => {
  router.get("/", async (req, res, next) => {
    return res.send(`<h3>Bonjour</h3>`);
  });

  router.use("/users", usersRouter(Users));

  return router;
};
