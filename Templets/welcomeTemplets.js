const welcomeEmail = ({ name, email }) => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Welcome to CartBit</title>
</head>

<body style="
    margin:0;
    padding:0;
    background:#f4f7fb;
    font-family:Arial, Helvetica, sans-serif;
">

    <table width="100%" cellpadding="0" cellspacing="0" border="0"
        style="background:#f4f7fb; padding:40px 15px;">

        <tr>
            <td align="center">

                <!-- Main Container -->
                <table width="600" cellpadding="0" cellspacing="0" border="0"
                    style="
                        max-width:600px;
                        width:100%;
                        background:#ffffff;
                        border-radius:16px;
                        overflow:hidden;
                        box-shadow:0 8px 30px rgba(0,0,0,0.08);
                    ">

                    <!-- Header -->
                    <tr>
                        <td style="
                            background:#111827;
                            padding:30px;
                            text-align:center;
                        ">

                            <div style="
                                font-size:30px;
                                font-weight:bold;
                                color:#ffffff;
                                letter-spacing:1px;
                            ">
                                🛒 CartBit
                            </div>

                            <p style="
                                margin:10px 0 0;
                                color:#d1d5db;
                                font-size:14px;
                            ">
                                Your smart shopping experience
                            </p>

                        </td>
                    </tr>


                    <!-- Welcome Section -->
                    <tr>
                        <td style="padding:40px 35px 20px;">

                            <h1 style="
                                margin:0 0 15px;
                                color:#111827;
                                font-size:28px;
                            ">
                                Welcome to CartBit, ${name}! 🎉
                            </h1>

                            <p style="
                                margin:0;
                                color:#4b5563;
                                font-size:16px;
                                line-height:1.7;
                            ">
                                We're excited to have you with us.
                                Your CartBit account has been successfully
                                created and you're now ready to explore
                                everything CartBit has to offer.
                            </p>

                        </td>
                    </tr>


                    <!-- Account Information -->
                    <tr>
                        <td style="padding:20px 35px;">

                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="
                                    background:#f9fafb;
                                    border-radius:10px;
                                    padding:20px;
                                ">

                                <tr>
                                    <td>

                                        <p style="
                                            margin:0 0 8px;
                                            color:#6b7280;
                                            font-size:13px;
                                        ">
                                            ACCOUNT EMAIL
                                        </p>

                                        <p style="
                                            margin:0;
                                            color:#111827;
                                            font-size:16px;
                                            font-weight:bold;
                                        ">
                                            ${email}
                                        </p>

                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>


                    <!-- CTA -->
                    <tr>
                        <td align="center" style="padding:25px 35px;">

                            <a href="http://localhost:3000/login"
                                style="
                                    display:inline-block;
                                    background:#111827;
                                    color:#ffffff;
                                    text-decoration:none;
                                    padding:14px 32px;
                                    border-radius:8px;
                                    font-size:15px;
                                    font-weight:bold;
                                ">
                                Login to CartBit →
                            </a>

                        </td>
                    </tr>


                    <!-- Features -->
                    <tr>
                        <td style="padding:20px 35px 35px;">

                            <h2 style="
                                margin:0 0 20px;
                                color:#111827;
                                font-size:20px;
                            ">
                                What you can do with CartBit
                            </h2>


                            <table width="100%" cellpadding="0" cellspacing="0">

                                <tr>
                                    <td style="padding:10px 0;">

                                        <span style="font-size:22px;">
                                            🛍️
                                        </span>

                                        <strong style="
                                            color:#111827;
                                            margin-left:8px;
                                        ">
                                            Shop Easily
                                        </strong>

                                        <p style="
                                            margin:5px 0 0 32px;
                                            color:#6b7280;
                                            font-size:14px;
                                        ">
                                            Discover products and enjoy a
                                            smooth shopping experience.
                                        </p>

                                    </td>
                                </tr>


                                <tr>
                                    <td style="padding:10px 0;">

                                        <span style="font-size:22px;">
                                            ⚡
                                        </span>

                                        <strong style="
                                            color:#111827;
                                            margin-left:8px;
                                        ">
                                            Fast & Simple
                                        </strong>

                                        <p style="
                                            margin:5px 0 0 32px;
                                            color:#6b7280;
                                            font-size:14px;
                                        ">
                                            Manage your shopping experience
                                            quickly and effortlessly.
                                        </p>

                                    </td>
                                </tr>


                                <tr>
                                    <td style="padding:10px 0;">

                                        <span style="font-size:22px;">
                                            🔒
                                        </span>

                                        <strong style="
                                            color:#111827;
                                            margin-left:8px;
                                        ">
                                            Secure Account
                                        </strong>

                                        <p style="
                                            margin:5px 0 0 32px;
                                            color:#6b7280;
                                            font-size:14px;
                                        ">
                                            Your account information is kept
                                            secure and protected.
                                        </p>

                                    </td>
                                </tr>

                            </table>

                        </td>
                    </tr>


                    <!-- Divider -->
                    <tr>
                        <td style="padding:0 35px;">
                            <hr style="
                                border:0;
                                border-top:1px solid #e5e7eb;
                            ">
                        </td>
                    </tr>


                    <!-- Support -->
                    <tr>
                        <td style="
                            padding:25px 35px;
                            text-align:center;
                        ">

                            <p style="
                                margin:0;
                                color:#4b5563;
                                font-size:14px;
                                line-height:1.6;
                            ">
                                Need help? Our support team is always
                                happy to help.
                            </p>

                            <a href="mailto:support@cartbit.com"
                                style="
                                    color:#111827;
                                    font-weight:bold;
                                    text-decoration:none;
                                ">
                                Contact Support
                            </a>

                        </td>
                    </tr>


                    <!-- Footer -->
                    <tr>
                        <td style="
                            background:#f9fafb;
                            padding:25px;
                            text-align:center;
                        ">

                            <p style="
                                margin:0 0 8px;
                                color:#111827;
                                font-size:14px;
                                font-weight:bold;
                            ">
                                CartBit
                            </p>

                            <p style="
                                margin:0;
                                color:#9ca3af;
                                font-size:12px;
                                line-height:1.6;
                            ">
                                © 2026 CartBit. All rights reserved.
                            </p>

                            <p style="
                                margin:8px 0 0;
                                color:#9ca3af;
                                font-size:12px;
                            ">
                                This is an automated email.
                                Please do not reply directly to this email.
                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>

    </table>

</body>
</html>
`;
};

export default welcomeEmail;