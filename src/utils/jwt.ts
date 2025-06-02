import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET;

export const signIn = (payLoad : object) => {
    if(!secret)
        return -1;
    return jwt.sign(payLoad,secret,{expiresIn : '7d'});
}

export const verifyIn = (token : string) => {
    if(!secret)
        return -1;
    return jwt.verify(token,secret);
}