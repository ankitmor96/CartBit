import Joi from "joi";

const OrderSchema = Joi.object({
    address: Joi.string().trim().required().messages({
        "string.base": "address must be in string",
        "string.empty": "address is required",
        "any.required": "address is required"
    }),

    items: Joi.array().items(Joi.object({

        food: Joi.string().hex().length(24).required().messages({
            "string.base": "food must be in string",
            "string.hex": "food must be a valid ObjectId",
            "string.length": "food must be 24 characters long",
            "any.required": "food is required"
        }),

        qty: Joi.number().integer().min(1).required().messages({
            "number.base": "qty must be a number",
            "number.integer": "qty must be an integer",
            "number.min": "qty must be at least 1",
            "any.required": "qty is required"
        })
    })
    ).min(1).required().messages({
        "array.base": "items must be an array",
        "array.min": "items must contain at least one item",
        "any.required": "items is required"
    }),

    restaurantName: Joi.string().hex().length(24).required().messages({
        "string.base": "restaurantName must be in string",
        "string.hex": "restaurantName must be a valid ObjectId",
        "string.length": "restaurantName must be 24 characters long",
        "any.required": "restaurantName is required"
    }),

    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        "string.base": "phone must be in string",
        "string.pattern.base": "phone must contain exactly 10 digits",
        "any.required": "phone is required"
    }),

    paymentMethod: Joi.string().valid("cod", "online").default("cod").messages({
        "any.only": "paymentMethod must be either cod or online"
    })

});

export const orderUpdateSchema = OrderSchema
    .fork(["address","items","restaurantName","phone","paymentMethod"],(field)=> field.optional())
    .or("address","items","restaurantName","phone","paymentMethod")

export default OrderSchema;