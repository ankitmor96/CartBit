import transporter from "../config/email.js";
import welcomeEmail from "../Templets/welcomeTemplets.js";

const sendMail = async ({ to, subject, html, name, email }) => {
    try {
        const info = await transporter.sendMail({
            from: '"CartBit" ,"ankitmor1811@gmail.com', // sender address
            to: to, // list of recipients
            subject: "🎉 Welcome to CartBit!", // subject line
            html: welcomeEmail({
                name,
                email
            })
        });

        console.log("MAIL TO:", to);

        console.log("Message sent: %s", info.messageId);
        // Preview URL is only available when using an Ethereal test account

    } catch (err) {
        console.error("Error while sending mail:", err);
    }
};

export default sendMail;