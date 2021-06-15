const configs = require("./src/config");
const router = require("./src/routes");
const asyncError = require("./src/lib/async-error");

const app = require("express")();
const config = configs[app.get("env") || "development"];
const log = config.log();

log.debug(`ENVIRONMENT: ${app.get("env")}`);

require("./src/config/error")(config);
require("./src/config/startup")(app, config);
require("./src/config/db")(config);

app.use("/", router);
app.use(asyncError);

app.listen(config.port, () => log.info("Server listening on port ", port));
