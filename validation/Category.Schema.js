import Joi from "joi";

const CategorySchema = Joi.object({

    name: Joi.string().min(3).max(20).required().messages({
        "string.base": "name is must be in string",
        "string.min": "name is minimum 3 charachter long",
        "string.max": "name is maximum 20 charachter long",
        "any.required": "name is required"
    }),

    description: Joi.string().min(5).max(300).required().messages({
        "string.base": "description is must be in string",
        "string.min": "description is minimum 5 charachter long",
        "string.max": "description is maximum 300 charachter long",
        "any.required": "description is required"
    }),

});

export default CategorySchema;