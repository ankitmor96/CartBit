import Joi from "joi";

const FoodSchema = Joi.object({

    name: Joi.string().min(3).max(25).required().messages({
        "string.base": "name is must be in string",
        "string.min": "name is minimum 3 charachter long",
        "string.max": "name is maximum 25 charachter long",
        "any.required": "name is required"
    }),

    price: Joi.number().min(25).max(10000).required().messages({
        "number.base": "price is must be in number",
        "number.min": "price is minimum 25 rupees long",
        "number.max": "price is maximum 10000 rupees ",
        "any.required": "price is required"
    }),

    descreption: Joi.string().min(5).max(300).required().messages({
        "string.base": "descreption is must be in string",
        "string.min": "descreption is minimum 5 charachter long",
        "string.max": "descreption is maximum 300 charachter long",
        "any.required": "descreption is required"
    }),

    restaurantName: Joi.string().min(3).max(15).required().messages({
        "string.base": "restaurantName is must be in string",
        "string.min": "restaurantName is minimum 3 charachter long",
        "string.max": "restaurantName is maximum 15 charachter long",
        "any.required": "restaurantName is required"
    }),

    providerName: Joi.string().min(4).max(12).required().messages({
        "string.base": "providerName is must be in string",
        "string.min": "providerName is minimum 4 charachter long",
        "string.max": "providerName is maximum 12 charachter long",
        "any.required": "providerName is required"
    }),

    FoodType: Joi.string().valid("veg", "non-veg").default("veg").required().messages({
        "string.base": "FoodType is must be in string",
        "any.required": "FoodType is required"
    }),

    preparingTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
        "string.pattern.base": "preparingTime is must be in pattern",
        "any.required": "preparingTime is required"
    }),

    isAvailable: Joi.boolean().default(true).messages({
        "boolean.base": "isVerified must be in boolean"
    }),

    isVerified: Joi.boolean().default(false).messages({
        "boolean.base": "isVerified must be in boolean"
    }),

});

export default FoodSchema;