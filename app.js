import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import router from "./routes/routes.js";

dotenv.config();

const app = express();
// Automatically parse request body as form data.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.use("/", router);
export default app;
