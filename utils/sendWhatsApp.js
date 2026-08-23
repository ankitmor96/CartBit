// import client from "../config/twilio.js";

// async function sendWhatsApp({ phone, orderId }) {
//     try {

//         console.log("WhatsApp Phone:", phone);
//         console.log("Order ID:", orderId);

//         const message = await client.messages.create({
//             from: process.env.TWILIO_WHATSAPP_NUMBER,
//             to: `whatsapp:+91${phone}`,
//             body: `Hello Ankit! Your CartBit order ${orderId} has been confirmed.`
//         });

//         console.log("Message SID:", message.sid);

//     } catch (error) {
//         console.log(error);
//     }
// }

// export default sendWhatsApp;


import clients from "../config/twilio.js";

const sendWhatsAppMessage = async(to,body)=>{
    try {
        const message = await clients.messages.create({
            from:"whatsapp:+17372212163",
            to:`whatsapp:+91${to}`,
            body
        })
        console.log("whatsapp id:",message.id);
        console.log("WhatsApp Message SID:", message.sid);
        console.log("Status:", message.status);
        return message
    } catch (error) {
        console.log(error.message);
    }
}
export default sendWhatsAppMessage;