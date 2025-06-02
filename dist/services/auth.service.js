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
exports.login = exports.register = void 0;
const client_1 = __importDefault(require("../db/client"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const register = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email } = req.body;
    const exists = yield client_1.default.user.findUnique({ where: { email } });
    if (exists)
        throw new Error("User already exists");
    const hash = yield bcrypt_1.default.hash(password, 5);
    const user = yield client_1.default.user.create({ data: { name: name, email: email, password: hash } });
    return user;
});
exports.register = register;
const login = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { password, email } = req.body;
    const exists = yield client_1.default.user.findUnique({ where: { email } });
    if (!exists)
        throw new Error("User does not exists");
    if (!(yield bcrypt_1.default.compare(password, exists.password)))
        throw new Error("Password does not match");
    return exists;
});
exports.login = login;
