import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

// get data barang
export function getBarang(req: Request, res: Response) {
  const { sku } = req.params;
  prisma.barang
    .findUnique({
      where: { sku: String(sku) },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

//create data barang
export function createBarang(req: Request, res: Response) {
  prisma.barang
    .create({ data: { ...req.body } })
    .then((result) => {
      res.json(result);
      // console.log(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

//update data barang
export function updateBarang(req: Request, res: Response) {
  const { sku } = req.params;
  prisma.barang
    .update({
      where: { sku: String(sku) },
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

//delete data
export function deleteBarang(req: Request, res: Response) {
  const { sku } = req.params;
  prisma.barang
    .delete({
      where: { sku: String(sku) },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

const BarangController = {
  getBarang,
  createBarang,
  updateBarang,
  deleteBarang,
};

export default BarangController;
