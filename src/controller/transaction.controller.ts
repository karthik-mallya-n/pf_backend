import { Request, Response } from 'express';
import * as service from '../services/transaction.service';

export const getAll = (req: Request, res: Response) => service.getAll(req, res);
export const add = (req: Request, res: Response) => service.addTrans(req, res);
