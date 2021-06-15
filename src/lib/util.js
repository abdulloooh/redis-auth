let jwt = require('jsonwebtoken');
let _ = require('lodash');
let env = require("../config/env")


exports.generateJWT = (user) => {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 7);
    return jwt.sign({
        id: user.id,
        googleId: user.googleId,
        exp: Math.floor(exp.getTime() / 1000)
    }, env.JWT_SECRET);
};