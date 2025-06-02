"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("../controller/transaction.controller");
const router = express_1.default.Router();
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
router.get('/', asyncHandler(transaction_controller_1.getAll));
router.post('/add', asyncHandler(transaction_controller_1.add));
exports.default = router;
