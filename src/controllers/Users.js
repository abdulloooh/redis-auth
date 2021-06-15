const { v4: uuid } = require("uuid");
const { hash, verify } = require("argon2");
import User from "../models/user";
const userSchema = require("../models/schema")["user"];

export default class Users {
  constructor({ log, redisClient }) {
    this.log = log();
    this.redisClient = redisClient;
  }

  async create(user) {
    return new Promise(async (resolve, reject) => {
      const { error } = userSchema.userCreation.validate(user);

      if (error) {
        return reject({
          code: 400,
          ok: false,
          msg: error.details[0].message,
        });
      }

      user.password = await hash(user.password);
      const response = await User.create(user);
      return resolve({
        ok: true,
        code: 201,
      });
    });
  }

  async login(user) {
    return new Promise(async (resolve, reject) => {
      const { error } = userSchema.userLogin.validate(user);

      const err = this.userError();

      if (error) return reject(this.userError());

      const userDb = await User.findOne({ email: user.email });
      if (!userDb) return reject(this.userError());

      if (!(await verify(userDb.password, user.password))) return reject(this.userError());

      const token = uuid();
      const payload = JSON.stringify({ username: userDb.username, restricted: userDb.restricted });

      this.redisClient.sadd(payload, token, (err, resp) => {
        if (err) return reject(this.userError("please try again"));
        this.redisClient.set(token, payload, (err, resp) => {
          if (err) return reject(this.userError("please try again"));
          return resolve({
            ok: true,
            code: 200,
            user: userDb.transformUserEntity(),
            access_token: token,
          });
        });
      });
    });
  }

  userError(msg = "Incorrect details") {
    return {
      code: 400,
      ok: false,
      msg,
    };
  }
}
