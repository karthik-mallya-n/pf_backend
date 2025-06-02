"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyIn = exports.signIn = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.JWT_SECRET;
const signIn = (payLoad) => {
    if (!secret)
        return -1;
    return jsonwebtoken_1.default.sign(payLoad, secret, { expiresIn: '7d' });
};
exports.signIn = signIn;
const verifyIn = (token) => {
    if (!secret)
        return -1;
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verifyIn = verifyIn;
