import Joi from "joi";

const restaurantSchema = Joi.object({

    restaurantName: Joi.string().min(1).max(30).required().messages({
     "string.base":"name is moust be in string",
     "string.min":"name is minimum 1 charachter is long",
     "string.max":"name is maximum 30 charachter is long",
     "any.required":"name is required"
    }),

    description: Joi.string().min(2).max(20).required().messages({
        "string.base":"description is must be in stroing",
        "string.min":"description is minimum 2 charachter is long",
        "string.max":"description is maximum 20 charachter is long",
        "any.required":"description is required"
    }),

    address: Joi.string().min(2).max(100).required().messages({
        "string.base":"address must be in string",
        "string.min":"address is minimum 2 charachter is long",
        "string.max":"address is maximum 100 charachter is long",
        "any.required":"address is required"
    }),

    state: Joi.string().min(1).max(15).required().messages({
        "string.base":"state must be in string",
        "string.min":"state is minimum 1 charachter is long",
        "string.max":"state is maximum 4 charachter is long",
        "any.required":"state is required"   
    }),

    city: Joi.string().min(1).max(10).required().messages({
        "string.base":"city is must be in string",
        "string.min":"city is minimum 1 charachter is long",
        "string.max":"city is maximum 5 charachter is long",
        "any.required":"city is required"
    }),

    phone: Joi.string().min(10).pattern(/^[0-9]{10}$/).required().messages({
        "string.pattern.base":"phone is minimum 10 digits",
        "any.required":"phone is required"
    }),

    openingTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
        "string.pattern.base":"openingTime must be in hh:mm format",
        "any.required":" openingTime is required"
    }),

    closingTime: Joi.string().pattern(/^([01]\d|2[0-3]):([0-5]\d)$/).required().messages({
        "string.pattern.base":" closingTime must be in hh:mm format",
        "any.required":"closingTime is required"
    }),

    isOpen: Joi.boolean().required().messages({
        "boolean.base":" isOpen is must be in boolean",
        "any.required":" isOpen is required"
    }),

});

export default restaurantSchema;