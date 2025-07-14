import joi from "joi"

export const userValidationSchema=joi.object({
  name:joi.string().min(3).trim().required().messages({
    "name empty":"name should not be empty and it should be more than 3 characters"
  }),
  email:joi.string().email().trim().required().messages({
    "email empty":"email is required and it should not empty"
  }),
  phone: joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.empty': 'Phone number should not be empty',
      'string.pattern.base': 'Phone number must be exactly 10 digits',
      'any.required': 'Phone number is required'
    }),
    password:joi.string().min(8).trim().required().messages({
      "password":"password should at least 6 characters not less than that"
    })
})