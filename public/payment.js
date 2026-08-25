const payButton = document.getElementById("payBtn");

payButton.addEventListener("click", payNow);


function payNow() {

    console.log("BUTTON CLICKED");

    if (typeof Razorpay === "undefined") {

        console.error("Razorpay SDK NOT LOADED");

        return;
    }


    const options = {

        key: "rzp_test_TTUY6XXjw919QM",

        amount: 125000,

        currency: "INR",

        name: "CartBit",

        description: "CartBit Test Payment",

        order_id: "order_TTxop0qH4wiks5",


        handler: async function (response) {

            console.log("Razorpay Response:",response);

            const verifyData = {

                razorpay_order_id:response.razorpay_order_id,
                
                razorpay_payment_id:response.razorpay_payment_id,

                razorpay_signature:response.razorpay_signature
            };

            console.log("VERIFY DATA:",verifyData);

            try {

                const result = await fetch( "/payment/verifyRazorpayPayment",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify(verifyData)
                    }
                );


                const data = await result.json();


                console.log("VERIFY RESPONSE:",data);


                if (data.success) {

                    alert("Payment verified successfully!");

                } else {

                    alert("Payment verification failed!");

                }

            } catch (error) {

                console.error(
                    "Verification error:",
                    error
                );

            }

        }

    };


    const razorpay =
        new Razorpay(options);


    razorpay.open();

}