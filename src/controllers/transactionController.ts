import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { entryPurchasing } from "./purchasingController";

const prisma = new PrismaClient();

//create transaction
export function createTransaction(req: Request, res: Response) {
  const transId: String = `trans${Date.now().toString}`;
  const { purchase } = req.body;
  const { data } = req.body;
  data.id = transId;

  prisma.transaction
    .create({ data: data })
    .then((result) => {
      entryPurchasing(purchase).then().catch();
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

const TransactionController = {
  createTransaction,
};

export default TransactionController;
