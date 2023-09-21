import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

//create user

export function createUser(req: Request, res: Response) {
  prisma.user
    .create({
      data: { ...req.body },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

//get user

export function getUser(req: Request, res: Response) {
  const { username } = req.params;
  prisma.user
    .findUnique({
      where: { username: String(username) },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}
const User = { createUser, getUser };

export default User;
