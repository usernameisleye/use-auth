const joi = require("joi")

const userValidator = joi.object({
  username: joi.string().min(3).max(50).optional(),
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi
    .string()
    .min(8)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .trim()
    .required(),
})

module.exports = userValidator
