"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTrans = exports.getAll = void 0;
const client_1 = __importDefault(require("../db/client"));
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.id)
            return res.status(401).json({ message: "Unauthorized" });
        const transactions = yield client_1.default.transaction.findMany({
            where: { user_id: req.id },
            orderBy: { date: "desc" },
        });
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch transactions" });
    }
});
exports.getAll = getAll;
const addTrans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.id)
            return res.status(401).json({ message: "Unauthorized" });
        const { type, category, amount, note, date } = req.body;
        if (!type || !category || !amount || !date) {
            return res.status(400).json({ message: "Missing required fields" });
        }
        const trans = yield client_1.default.transaction.create({
            data: {
                user_id: req.id,
                type,
                category,
                amount: parseFloat(amount),
                note,
                date: new Date(date),
            },
        });
        res.status(201).json(trans);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to add transaction" });
    }
});
exports.addTrans = addTrans;
