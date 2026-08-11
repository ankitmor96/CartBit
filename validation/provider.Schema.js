import Joi from "joi";

const providerSchema = Joi.object({


    ownerName: Joi.string().required().min(3).max(30).messages({
        "string.base":"ownerName must be in string",
        "string.min":"ownerName minimum 3 charachter ling ",
        "string.max":"ownerName maximum 30 charachter long",
        "any.required":"ownerName is required"
    }),

    restaurants: Joi.array().items(Joi.string()).required().messages({
        "array.base":"restaurants must be in array",
        "any.required":"restaurant is required"
    }),

    // documents: Joi.string().required().messages({
    //     "string.base":"documents must be in string",
    //     "any.required":"documents is required"
    // }),

    bankAccountNumber: Joi.string().required().messages({
        "string.base":"bankAccountNumber must be in string",
        "any.required":"bankAccountNumber is required"
    }),

    isVerified: Joi.boolean().default(false).messages({
        "boolean.base":"isVerified must be in boolean"
    }),
});

export const privoderUpdateSchema = providerSchema
.fork(["ownerName","restaurants","bankAccountNumber"], (field)=> field.optional())
.fork(["isVerified"], (field)=> field.forbidden().messages({"any.unknown":"isVerified can not be updated"}))
.or("ownerName","restaurants","bankAccountNumber");

export default providerSchema;