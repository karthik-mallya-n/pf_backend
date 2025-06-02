"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddle = void 0;
const jwt_1 = require("../utils/jwt");
const authMiddle = (req, res, next) => {
    try {
        let token;
        // Check Authorization header first
        const authHeader = req.headers.authorization;
        if (authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        // If no token in auth header, check cookies
        else if (req.cookies && req.cookies.token) {
            token = req.cookies.token;
        }
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }
        const verify = (0, jwt_1.verifyIn)(token);
        if (!verify) {
            return res.status(401).json({ message: "Token verification failed" });
        }
        // Properly set user ID on request object
        //@ts-ignore
        req.id = verify.user_id;
        return next();
    }
    catch (e) {
        return res.status(401).json({ message: "Authentication failed" });
    }
};
exports.authMiddle = authMiddle;
