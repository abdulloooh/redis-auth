// const config = configs[app.get("env") || "development"];
// const log = config.log();

// module.exports = function (err, req, res, next) {
//   log.error(err.message);
//   res.status(err.status || 500).send(
//     /^[4]\d{2}$/.test(err.status) //intentionally thrown error details
//       ? err.details
//       : {
//           ok: false,
//           msg: "Server temporarily unavailable, please try again later",
//         }
//   );
// };

module.exports = ({ log }) => {
  return function (err, req, res, next) {
    log.error(err.message);
    res.status(err.status || 500).send(
      /^[4]\d{2}$/.test(err.status) //intentionally thrown error details
        ? err.details
        : {
            ok: false,
            msg: "Server temporarily unavailable, please try again later",
          }
    );
  };
};
