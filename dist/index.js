"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const transaction_routes_1 = __importDefault(require("./routes/transaction.routes"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_middleware_1 = require("./middlewares/auth.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
// More flexible CORS configuration
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // Frontend URLs
    credentials: true, // Allow credentials (cookies)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"], // Allowed headers
    exposedHeaders: ["Content-Length", "X-Confirm-Delete"] // Headers client can read
}));
app.use('/api/auth', auth_routes_1.default);
// Improved auth middleware handling
app.use('/api/transactions', (req, res, next) => {
    try {
        (0, auth_middleware_1.authMiddle)(req, res, next);
    }
    catch (error) {
        console.error("Auth middleware error:", error);
        res.status(500).json({ message: "Server authentication error" });
    }
}, transaction_routes_1.default);
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Listening on port : " + PORT);
});
