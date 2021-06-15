import User from "../models/user";
const { hash } = require("argon2");
const userSchema = require("../models/schema")["user"];

export default class Users {
  constructor({ log }) {
    this.log = log();
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
        user: response.transformUserEntity(),
      });
    });
  }
}
