const Joi = require("joi");

module.exports = {
  user: {
    userCreation: Joi.object({
      username: Joi.string().alphanum().min(3).max(30).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
    }),
    userLogin: Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string().required(),
    }),
  },

  // campaign: {
  //     campaignCreation: Joi.object().keys({
  //         title: Joi.string().min(1).required(),
  //         description: Joi.string().min(1).required(),
  //         duration: Joi.number().min(1).required(),
  //         recurring: Joi.boolean().required(),
  //         assets: Joi.array().items(Joi.string().min(1)).optional(),
  //         target: Joi.number().min(1).required()
  //     }),
  //     campaignEdit: Joi.object().keys({
  //         id: Joi.string().min(1).required(),
  //         title: Joi.string().min(1).optional(),
  //         target: Joi.number().min(1).optional(),
  //         description: Joi.string().min(1).optional(),
  //         duration: Joi.number().min(1).optional(),
  //         recurring: Joi.boolean().optional(),
  //         assets: Joi.array().items(Joi.string().min(1)).optional()
  //     }),

  // },
  // record: {
  //     recordCreation: Joi.object().keys({
  //         campaign: Joi.string().min(1).required(),
  //         duration: Joi.number().min(1).required(),
  //     })

  // },
  // payment: {
  //     paymentCreation: Joi.object().keys({
  //         campaign: Joi.string().min(1).required(),
  //         amount: Joi.number().min(1).required(),
  //         type: Joi.number().min(0).required()
  //     })
  // }
};
