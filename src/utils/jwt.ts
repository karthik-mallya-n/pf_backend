import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET || 'fallback_secret_for_development'; // Fallback for development

export const signIn = (payLoad: object) => {
    try {
        return jwt.sign(payLoad, secret, { expiresIn: '7d' });
    } catch (error) {
        console.error("Error signing JWT:", error);
        throw new Error("Failed to generate authentication token");
    }
}

export const verifyIn = (token: string) => {
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Error verifying JWT:", error);
        throw new Error("Invalid or expired token");
    }
}