import express from "express";
import prisma from "../db/client";

// Extend Express Request type to include id
interface AuthenticatedRequest extends express.Request {
  id?: number;
}

export const getAll = async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    if (!req.id) return res.status(401).json({ message: "Unauthorized" });
    const transactions = await prisma.transaction.findMany({
      where: { user_id: req.id },
      orderBy: { date: "desc" },
    });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
};

export const addTrans = async (req: AuthenticatedRequest, res: express.Response) => {
  try {
    if (!req.id) return res.status(401).json({ message: "Unauthorized" });
    const { type, category, amount, note, date } = req.body;
    if (!type || !category || !amount || !date) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const trans = await prisma.transaction.create({
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
  } catch (error) {
    res.status(500).json({ message: "Failed to add transaction" });
  }
};