const actionEmail = ({
    action,
    name,
    email,
    itemName
}) => {

    let title = "";
    let heading = "";
    let message = "";
    let icon = "";
    let label = "";
    let value = "";


    // USER ADD
    if (action === "USER_ADDED") {

        title = "Welcome to CartBit 🎉";

        heading = `Welcome to CartBit, ${name}!`;

        message = `
            Your account has been successfully created.

            We are happy to have you as a part of CartBit.
        `;

        icon = "👤";
        label = "Account Email";
        value = email;
    }


    // USER DELETE
    else if (action === "USER_DELETED") {

        title = "CartBit Account Deleted";

        heading = `Your CartBit account has been deleted`;

        message = `
            Hello ${name},

            Your CartBit account has been successfully deleted
            from our system.

            If you believe this action was taken by mistake,
            please contact our support team.
        `;

        icon = "🗑️";
        label = "Deleted Account";
        value = email;
    }


    // RESTAURANT ADD
    else if (action === "RESTAURANT_ADDED") {

        title = "Restaurant Added Successfully 🍽️";

        heading = "Restaurant Added Successfully";

        message = `
            Hello ${name},

            Your restaurant has been successfully added to CartBit.

            You can now manage your restaurant from your account.
        `;

        icon = "🍽️";
        label = "Restaurant Name";
        value = itemName;
    }


    // RESTAURANT DELETE
    else if (action === "RESTAURANT_DELETED") {

        title = "Restaurant Deleted";

        heading = "Restaurant Deleted Successfully";

        message = `
            Hello ${name},

            Your restaurant has been successfully removed
            from CartBit.

            If this action was not expected, please contact
            the CartBit administration team.
        `;

        icon = "🗑️";
        label = "Restaurant Name";
        value = itemName;
    }


    // PROVIDER ADD
    else if (action === "PROVIDER_ADDED") {

        title = "Provider Added Successfully 🏢";

        heading = "Provider Registration Completed";

        message = `
            Hello ${name},

            Your provider information has been successfully
            added to CartBit.

            Our team may review your information before
            verification.
        `;

        icon = "🏢";
        label = "Provider Email";
        value = email;
    }


    // PROVIDER DELETE
    else if (action === "PROVIDER_DELETED") {

        title = "Provider Removed";

        heading = "Provider Information Removed";

        message = `
            Hello ${name},

            Your provider information has been successfully
            removed from CartBit.

            If you believe this action was taken by mistake,
            please contact the CartBit administration team.
        `;

        icon = "🗑️";
        label = "Provider Email";
        value = email;
    }
    // ORDER ADD
    else if (action === "ORDER_ADDED") {

        title = "Order Placed Successfully 🛒";

        heading = "Your Order Has Been Placed Successfully";

        message = `
        Hello ${name},

        Your order has been successfully placed on CartBit.

        Thank you for ordering with us. Your order will be processed shortly.
    `;

        icon = "🛒";
        label = "Order Item";
        value = itemName;
    }


    // ORDER DELETE
    else if (action === "ORDER_DELETED") {

        title = "Order Cancelled / Deleted 🗑️";

        heading = "Your Order Has Been Deleted";

        message = `
        Hello ${name},

        Your order has been successfully deleted from CartBit.

        If you did not perform this action, please contact our support team.
    `;

        icon = "🗑️";
        label = "Order Item";
        value = itemName;
    }


    // FOOD ADD
    else if (action === "FOOD_ADDED") {

        title = "Food Added Successfully 🍕";

        heading = "Food Item Added Successfully";

        message = `
        Hello ${name},

        Your food item has been successfully added to CartBit.

        You can now manage this food item from your account.
    `;

        icon = "🍕";
        label = "Food Name";
        value = itemName;
    }


    // FOOD DELETE
    else if (action === "FOOD_DELETED") {

        title = "Food Item Deleted 🗑️";

        heading = "Food Item Deleted Successfully";

        message = `
        Hello ${name},

        Your food item has been successfully deleted from CartBit.

        If this action was not expected, please contact the CartBit administration team.
    `;

        icon = "🗑️";
        label = "Food Name";
        value = itemName;
    }


    // CATEGORY ADD
    else if (action === "CATEGORY_ADDED") {

        title = "Category Added Successfully 📂";

        heading = "Category Added Successfully";

        message = `
        Hello ${name},

        Your category has been successfully added to CartBit.

        You can now use this category for managing your food items.
    `;

        icon = "📂";
        label = "Category Name";
        value = itemName;
    }


    // CATEGORY DELETE
    else if (action === "CATEGORY_DELETED") {

        title = "Category Deleted 🗑️";

        heading = "Category Deleted Successfully";

        message = `
        Hello ${name},

        Your category has been successfully deleted from CartBit.

        If this action was not expected, please contact the CartBit administration team.
    `;

        icon = "🗑️";
        label = "Category Name";
        value = itemName;
    }


    // INVALID ACTION
    else {

        throw new Error(
            `Invalid email action: ${action}`
        );

    }


    // COMMON EMAIL DESIGN
    return {

        subject: title,

        html: `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <title>${title}</title>

</head>


<body style="
    margin:0;
    padding:0;
    background:#f3f4f6;
    font-family:Arial, Helvetica, sans-serif;
">


    <div style="
        max-width:600px;
        margin:40px auto;
        background:#ffffff;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 4px 15px rgba(0,0,0,0.08);
    ">


        <!-- HEADER -->

        <div style="
            background:#111827;
            padding:25px;
            text-align:center;
        ">

            <h1 style="
                margin:0;
                color:#ffffff;
                font-size:28px;
            ">
                CartBit
            </h1>

            <p style="
                margin:8px 0 0;
                color:#d1d5db;
                font-size:14px;
            ">
                Food & Restaurant Management Platform
            </p>

        </div>


        <!-- MAIN CONTENT -->

        <div style="
            padding:35px 30px;
        ">


            <!-- ICON -->

            <div style="
                text-align:center;
                font-size:50px;
                margin-bottom:15px;
            ">
                ${icon}
            </div>


            <!-- HEADING -->

            <h2 style="
                margin:0 0 20px;
                text-align:center;
                color:#111827;
                font-size:24px;
            ">
                ${heading}
            </h2>


            <!-- MESSAGE -->

            <p style="
                color:#4b5563;
                font-size:16px;
                line-height:1.7;
                white-space:pre-line;
            ">
                ${message}
            </p>


            <!-- INFORMATION -->

            <div style="
                margin-top:25px;
                padding:20px;
                background:#f9fafb;
                border:1px solid #e5e7eb;
                border-radius:10px;
            ">

                <p style="
                    margin:0 0 8px;
                    color:#6b7280;
                    font-size:13px;
                ">
                    ${label}
                </p>

                <p style="
                    margin:0;
                    color:#111827;
                    font-size:16px;
                    font-weight:bold;
                    word-break:break-word;
                ">
                    ${value || "N/A"}
                </p>

            </div>


            <!-- FOOTER MESSAGE -->

            <p style="
                margin-top:30px;
                color:#6b7280;
                font-size:13px;
                line-height:1.6;
                text-align:center;
            ">
                This is an automated email from CartBit.
                Please do not reply to this email.
            </p>


        </div>


        <!-- FOOTER -->

        <div style="
            background:#f9fafb;
            padding:20px;
            text-align:center;
            border-top:1px solid #e5e7eb;
        ">

            <p style="
                margin:0;
                color:#9ca3af;
                font-size:13px;
            ">
                © ${new Date().getFullYear()} CartBit.
                All rights reserved.
            </p>

        </div>


    </div>

</body>

</html>

        `
    };
};


export default actionEmail;