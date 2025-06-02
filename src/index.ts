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

app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:3000","https://pf-frontend-izwe.onrender.com"], // Frontend URLs
  credentials: true, // Allow credentials (cookies)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allowed headers
  exposedHeaders: ["Content-Length", "X-Confirm-Delete"] // Headers client can read
}));
app.use('/api/auth', Authrouter);

app.use('/api/transactions', (req, res, next) => {
  try {
    authMiddle(req, res, next);
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Server authentication error" });
  }
}, TransRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT,()=>{
    console.log("Listening on port : "+ PORT);
})

