import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient();

dotenv.config();

export function signUp(req: Request, res: Response) {
  req.body.password = bcryptjs.hashSync(req.body.password, 8);

  prisma.user
    .create({
      data: { ...req.body },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).send({
        auth: false,
        id: req.body.id,
        message: "Error",
        errors: err,
      });
    });
}
