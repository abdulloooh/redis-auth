const router = require("./src/routes");
const configs = require("./src/config");
const asyncError = require("./src/lib/async-error");

const app = require("express")();
const config = configs[app.get("env") || "development"];
const log = config.log();

require("./src/config/error")(config);
require("./src/config/startup")(app, config);
require("./src/config/db")(config);

config.redisClient = require("./src/config/redis")(config);

app.use("/", router(config));
app.use(asyncError(config));

app.listen(config.port, () =>
  log.info(`Server listening on port ${config.port} in ${app.get("env")}`)
);
