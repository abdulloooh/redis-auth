const express = require("express");
const router = express.Router();

module.exports = ({ Users }) => {
  router.get("/", (req, res) => {
    return res.send({ ok: true, data: "lol users" });
  });

  return router;
};
