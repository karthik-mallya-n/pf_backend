"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.post('/register', asyncHandler(auth_controller_1.register));
router.post('/login', asyncHandler(auth_controller_1.login));
router.post('/logout', asyncHandler(auth_controller_1.logout));
exports.default = router;
