const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

module.exports = (userController, config) => {
  const { redisClient } = config;
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const response = await userController.login({ email, password });
    return res.send(response);
  });

  router.post("/logout", auth(config), async (req, res) => {
    const response = await userController.logout(req.user);
    return res.send(response);
  });

  return router;
};
