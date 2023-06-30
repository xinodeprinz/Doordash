import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .required()
    .error(new Error("The name is required")),
  email: Joi.string()
    .email()
    .required()
    .error(new Error("Provide a valid email address")),
  phone: Joi.string()
    .pattern(/^[0-9]{9}$/)
    .required()
    .error(new Error("Provide a valid phone number")),
  address: Joi.string().required().error(new Error("The address is required.")),
  type: Joi.string().required().error(new Error("The type is required.")),
  password: Joi.string()
    .min(5)
    .required()
    .error(new Error("Please provide a valid password.")),
});

export const loginSchema = Joi.object({
  phone: Joi.string()
    .pattern(/^[0-9]{9}$/)
    .required()
    .error(new Error("Provide a valid phone number")),
  password: Joi.string()
    .required()
    .error(new Error("The password is required")),
});

export const updateUserSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .optional()
    .error(new Error("Provide a valid name")),
  phone: Joi.string()
    .pattern(/^[0-9]{9}$/)
    .optional()
    .error(new Error("Provide a valid phone number")),
  address: Joi.string().optional().error(new Error("Provide a valid address.")),
  password: Joi.string()
    .min(5)
    .optional()
    .error(new Error("Please provide a valid password.")),
});

export const errandSchema = Joi.object({
  name: Joi.string().required().error(new Error("Provide a valid name")),
  description: Joi.string()
    .required()
    .error(new Error("Provide a valid description")),
});

export const paymentSchema = Joi.object({
  amount: Joi.number()
    .min(10)
    .max(1000000)
    .required()
    .error(new Error("Provide an amount in the range 10 to 1,000,000")),
});
