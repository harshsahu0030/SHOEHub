import express from "express";
import cookieParser from "cookie-parser";
import middleware from "./middlewares/error.js";
import cors  from "cors"

const app = express();

//this party middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(cors());

//import routers
import userRoute from "./routes/userRoute.js";
import productsRoute from "./routes/productsRoute.js";
import orderRoute from "./routes/orderRoute.js";

//use routers
app.use("/api/v1", userRoute);
app.use("/api/v1", productsRoute);
app.use("/api/v1", orderRoute);

//error middleware
app.use(middleware);

export default app;
