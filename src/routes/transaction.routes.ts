import express from "express";
import { getAll, add } from "../controller/transaction.controller";

const router = express.Router();

const asyncHandler = (fn: any) => (req: express.Request, res: express.Response, next: express.NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get('/', asyncHandler(getAll));
router.post('/add', asyncHandler(add));

export default router;