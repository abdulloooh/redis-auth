const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

module.exports = (userController, config) => {
  router.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    const response = await userController.create({ username, email, password });
    return res.send(response);
  });

  router.get("/me", auth(config), async (req, res) => {
    config.log().info(req.user);
    return res.send("user");
  });

  return router;
};
