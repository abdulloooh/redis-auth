const express = require("express");
const router = express.Router();

module.exports = (userController) => {
  router.post("/", async (req, res) => {
    const { username, email, password } = req.body;
    const response = await userController.create({ username, email, password });
    return res.send(response);
  });
  return router;
};
