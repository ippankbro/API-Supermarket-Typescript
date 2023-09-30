import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

//create transaction
// export function createTransaction(req: Request, res: Response) {
//   // const transId: String = `trans${Date.now().toString}`;

//   const transId = v1();
//   let purchases: Purchase[];
//   const { reqPurchase } = req.body;
//   const { data } = req.body;
//   purchases = reqPurchase;

//   purchases.map((purchase, index) => {
//     purchases[index].trans_id = transId;
//   });

//   data.id = transId;

//   prisma.transaction
//     .create({ data: data })
//     .then((result) => {
//       console.log("transaction done");
//       entryPurchasing(purchases)
//         .then((result) => {
//           console.log("purchase done");
//           res.json(result);
//         })
//         .catch((err) => {
//           res.json({ error: err });
//         });
//     })
//     .catch((err) => {
//       res.json({ error: err });
//     });
// }

export function createTransaction(req: Request, res: Response) {
  const { transactionData, purchasesData } = req.body;
  prisma.transaction
    .create({
      data: { ...transactionData, Purchase: { create: purchasesData } },
    })
    .then((result) => {
      res.json(result);
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

//delete transaction

export function deleteTransaction(req: Request, res: Response) {
  const { id } = req.params;
  const deletPurchase = prisma.purchase.deleteMany({
    where: { trans_id: String(id) },
  });
  const deleteTrans = prisma.transaction.delete({
    where: { id: String(id) },
  });
  prisma
    .$transaction([deletPurchase, deleteTrans])
    .then((result) => {
      res.send(`transaksi no. ${id} berhasil di hapus`);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

const TransactionController = {
  createTransaction,
  getTransaction,
  deleteTransaction,
};

export default TransactionController;
