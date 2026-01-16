import mongoose from "mongoose";
// @ts-ignore
import app from "./app";
import {connectDB} from "./config/database";

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
    await connectDB();
    console.log("Server started on port: " + PORT);

})
