const express = require("express");
const router = express.Router();

module.exports = (userController) => {
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const response = await userController.login({ email, password });
    return res.send(response);
  });
  return router;
};
