const redis = require("redis");

module.exports = ({ log, redisport, redisauth }) => {
  const client = redis.createClient(redisport);
  client.auth(redisauth);
  client.on("connect", () => log().info("connected to redis client"));
  client.on("error", (err) => {
    throw new Error(err);
  });

  return client;
};
