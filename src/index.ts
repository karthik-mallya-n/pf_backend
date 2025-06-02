import express from "express";
import dotenv from "dotenv"
import Authrouter from "./routes/auth.routes";
import TransRouter from "./routes/transaction.routes"
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddle } from "./middlewares/auth.middleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors())
app.use('/api/auth', Authrouter);
app.use('/api/transactions', (req, res, next) => { authMiddle(req, res, next); }, TransRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log("Listening on port : "+ PORT);
})

