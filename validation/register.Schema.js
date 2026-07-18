import Joi from "joi";

 const registerSchema = Joi.object({

    name: Joi.string().min(2).max(50).required().trim().messages({
        "string.base": "name is must be in string",
        "string.min": "name must be 2 characters long",
        "string.max": "name must be 50 characters long",
        "any.required": "name is required"
    }),
    email: Joi.string().email().required().messages({
        "string.base": "email must be is in string",
        "string.email": "Please enter a valid email",
        "string.empty": "email is required",
        "any.required": "email is required"
    }),
    password: Joi.string().min(6).max(30).required().messages({
        "string.base": "password must be in string",
        "string.min": "password must be 6 character long",
        "string.max": "password must be 30 character long",
        "any.required": "password muct be required"
    }),
    phone: Joi.string().min(10).pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base": "phone must be exactly 10 digits",
        "any.required": "phone must be required"
    }),
    address: Joi.string().required().min(3).max(100).messages({
        "string.base": "address must be in string",
        "string.min": "address must be 5 character long",
        "string.max": "address must be 100 character long",
        "any.required": "address must be required"
    }),
});

 export const updateSchema = registerSchema
    .fork(["name", "phone", "password", "address"], (field) => field.optional())
    .fork(["email"], (field) => field.forbidden().messages({ "any.unknown": "email can not be updated" }))
    .or("name", "phone", "password", "address");
        



 export default registerSchema;