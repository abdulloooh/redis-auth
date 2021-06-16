module.exports = ({ redisClient, log: logger }) => {
  const log = logger();

  return function (req, res, next) {
    let token;
    if (req.headers.authorization) {
      let type = req.headers.authorization.split(" ")[0];
      if (type === "Token" || type === "Bearer") token = req.headers.authorization.split(" ")[1];
    }

    if (!token)
      return res.status(401).send({ ok: false, msg: "Session timeout, please log in again" });

    redisClient.get(token, (err, resp) => {
      if (err || !resp) return res.status(400).send({ ok: false, msg: "Please log in again" });
      req.user = JSON.parse(resp);
      req.user.access_token = token;
      next();
    });
  };
};
