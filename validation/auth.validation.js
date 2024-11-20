import Joi from "joi";

export function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
    lastName: Joi.string().min(3).required(),
  });

  return schema.validate(user);
}

export function validateUserLogin(user) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(8).max(255).required(),
  });

  return schema.validate(user);
}
