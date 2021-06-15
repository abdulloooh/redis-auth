const ON_DEATH = require("death")({ uncaughtException: true });

module.exports = function (config) {
  const log = config.log();

   ON_DEATH(async function (signal, err) {
      log.error(err);
      setTimeout(() => {
        process.exit(1);
      }, 300);
  });

  process.on("unhandledRejection", () => {
    throw new Error();
  });
};

