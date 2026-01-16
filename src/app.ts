import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
//import { errorHandler } from "./middlewares/errorHandler";
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());


app.use("/api/v1", routes);


export default app;
