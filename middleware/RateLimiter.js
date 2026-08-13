import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 5,
   message: {
        success: false,
        message: "Too many requests, please try again later"
    },
});

 export const authLimiter = rateLimit({
    windowMs : 15 * 60 * 1000,
    limit : 5,
    message: {
        success: false,
        message: "Too many requests, please try again later"
    },
})

export default rateLimiter ;