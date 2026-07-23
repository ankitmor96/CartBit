import express from "express";
import HttpError from "./middleware/HttpError.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/adminRoutes.js";
import restaurantRoutes from "./routes/restaurant.routes.js";
import restaurantModel from "./model/restaurant.model.js";
import User from "./model/user.model.js";



// .env file configration
dotenv.config({ path: "./.env" });

const app = express();

app.use(express.json());

// user routes
app.use("/User", userRoutes);

// admin routes
app.use("/admin", adminRoutes);

// restaurant routes
app.use("/restaurant", restaurantRoutes);



// routes
app.get("/", (req, res, next) => {
    res.send("hello from server");
});


//middleware routes
app.use((req, res, next) => {
    return next(new HttpError("route not found", 404));
});


// centrelized error routes
app.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(error.statusCode || 500).json({
        message: error.message || "internal server error"
    });
});


// connect db and create function 
const StartServer = async () => {
    try {

        await connectDB();

        const port = process.env.PORT || 5000; // define port 

        app.listen(port, (error) => {
            if (error) {
                console.log(error);
            }
            console.log(`server has runing on port ${port}`);
        });
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
};

StartServer();

async function ChekRestaurant() {
    try {

        const Restaurant = await restaurantModel // manually process read restaurant
        .findById("6a5f6877308ede49f65d1a81")
        .populate("owner"," name email phone address role tokens -_id");

        console.log("Restaurant :", Restaurant);

        // const owner = await User.findById(Restaurant.owner);  // manually process read owner 

        // console,log("owner :", Restaurant.owner);

    } catch (error) {
        console.log(error);
    }

};

ChekRestaurant();