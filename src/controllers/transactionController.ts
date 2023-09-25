import { PrismaClient, Purchase, PurchaseUnit } from "@prisma/client";
import { Request, Response } from "express";
import { entryPurchasing } from "./purchasingController";
import { v1 } from "uuid";
import { json } from "node:stream/consumers";

const prisma = new PrismaClient();

//create transaction
export function createTransaction(req: Request, res: Response) {
  // const transId: String = `trans${Date.now().toString}`;

  const transId = v1();
  let purchases: Purchase[];
  const { reqPurchase } = req.body;
  const { data } = req.body;
  purchases = reqPurchase;

  purchases.map((purchase, index) => {
    purchases[index].trans_id = transId;
  });

  data.id = transId;

  prisma.transaction
    .create({ data: data })
    .then((result) => {
      console.log("transaction done");
      entryPurchasing(purchases)
        .then((result) => {
          console.log("purchase done");
          res.json(result);
        })
        .catch((err) => {
          res.json({ error: err });
        });
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

//get transaction

export function getTransaction(req: Request, res: Response) {
  prisma.transaction
    .findMany({ include: { Purchase: { include: { brg_name: true } } } })
    .then((result) => {
      // let result2: Array<any> = [];
      // result.map((data, index) => {
      //   let data2 = { ...data, receipt: data.receipt.toString() };
      //   result2.push(data2);
      //   // console.log(data2);
      // });
      // res.json(result2);
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: err });
    });
}

const TransactionController = {
  createTransaction,
  getTransaction,
};

export default TransactionController;
