let mongoose = require("mongoose");

module.exports = function (config) {
  const log = config.log();
  mongoose
    .connect(config.db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      log.info("connected to mongodb successfully...");
    });
};
