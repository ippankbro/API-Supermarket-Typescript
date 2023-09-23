import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

//Create data cashier

export function createCashier(req: Request, res: Response) {
  prisma.cashier
    .create({ data: { ...req.body } })
    .then((result) => {
      res.json(result);
      // console.log(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

export function getCashier(req: Request, res: Response) {
  const { id } = req.params;
  prisma.cashier
    .findUnique({
      where: { id: String(id) },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

export function updateCashier(req: Request, res: Response) {
  const { id } = req.params;
  prisma.cashier
    .update({
      where: { id: String(id) },
      data: {
        ...req.body,
      },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

export function deleteCashier(req: Request, res: Response) {
  const { id } = req.params;
  prisma.cashier
    .delete({
      where: { id: String(id) },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

const CashierController = {
  createCashier,
  getCashier,
  updateCashier,
  deleteCashier,
};

export default CashierController;
