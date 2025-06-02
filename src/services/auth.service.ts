import { Request,Response } from "express"
import prisma from "../db/client";
import bcrypt from "bcrypt";
import { signIn } from "../utils/jwt";

export const register = async (req : Request) => {
    const {name,password,email} = req.body;
    const exists = await prisma.user.findUnique({where : {email}});
    if(exists)
        throw new Error("User already exists");
    const hash = await bcrypt.hash(password,5);
    const user = await prisma.user.create({data : {name : name , email : email , password : hash}});
    return user;
}

export const login = async (req : Request) => {
    const {password,email} = req.body;
    const exists = await prisma.user.findUnique({where : {email}});
    if(!exists)
        throw new Error("User does not exists");
    if(!(await bcrypt.compare(password,exists.password)))
        throw new Error("Password does not match");
    return exists
}