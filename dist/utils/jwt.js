"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIn = exports.signIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET || 'fallback_secret_for_development'; // Fallback for development
const signIn = (payLoad) => {
    try {
        return jsonwebtoken_1.default.sign(payLoad, secret, { expiresIn: '7d' });
    }
    catch (error) {
        console.error("Error signing JWT:", error);
        throw new Error("Failed to generate authentication token");
    }
};
exports.signIn = signIn;
const verifyIn = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, secret);
    }
    catch (error) {
        console.error("Error verifying JWT:", error);
        throw new Error("Invalid or expired token");
    }
};
exports.verifyIn = verifyIn;
