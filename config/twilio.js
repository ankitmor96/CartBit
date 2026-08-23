import twilio from "twilio";

console.log("SID:", process.env.TWILIO_ACCOUNT_SID);
console.log("TOKEN EXISTS:", !!process.env.TWILIO_AUTH_TOKEN);

const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,

);

export default client;