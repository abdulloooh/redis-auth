require("express-async-errors");

module.exports = ({ log: logger }) => {
  const log = logger();
  return function (err, req, res, next) {
    log.error(err);
    res.status(err.code || 500).send(
      /^[4]\d{2}$/.test(err.code) //intentionally thrown error details
        ? err
        : {
            ok: false,
            msg: "Server temporarily unavailable, please try again later",
          }
    );
  };
};
