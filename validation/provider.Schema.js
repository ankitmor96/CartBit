import Joi from "joi";

const providerSchema = Joi.object({


    ownerName: Joi.string().hex().length(24).messages({
        "string.base": "ownerName must be a string",
        "string.hex": "ownerName must be a valid ObjectId",
        "string.length": "ownerName must be 24 characters long",
        "any.required": "ownerName is required"
    }),

    restaurants: Joi.array().items(Joi.string().hex().length(24)).required().messages({
            "array.base": "restaurants must be an array",
            "any.required": "restaurants is required"
        }),

    // documents: Joi.string().required().messages({
    //     "string.base":"documents must be in string",
    //     "any.required":"documents is required"
    // }),

    bankAccountNumber: Joi.string().required().messages({
        "string.base": "bankAccountNumber must be in string",
        "any.required": "bankAccountNumber is required"
    }),

    isVerified: Joi.boolean().default(false).messages({
        "boolean.base": "isVerified must be in boolean"
    }),
});

export const privoderUpdateSchema = providerSchema
    .fork(["ownerName", "restaurants", "bankAccountNumber","isVerified"], (field) => field.optional())
    .or("ownerName", "restaurants", "bankAccountNumber","isVerified");

export default providerSchema;