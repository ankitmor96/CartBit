import transporter from "../config/email.js";
import actionEmail from "../Templets/actionEmail.js";

const sendMail = async ({ to, subject, html, name, email, action , itemName }) => {
    try {

        console.log("ACTION:", action);

        const template = actionEmail({
            name,
            email,
            action,
            itemName
        });

        const info = await transporter.sendMail({
            from: '"CartBit" ,<ankitmor1811@gmail.com>', // sender address
            to: to, // list of recipients
            subject: template.subject,
            html: template.html
        });

        console.log("MAIL TO:", to);

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account

    } catch (err) {
        console.error("Error while sending mail:", err);
    }
};

export default sendMail;