import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const prisma = new PrismaClient();

export function checkDuplicateUserNameOrEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  prisma.user
    .findUnique({
      where: {
        username: String(req.body.username),
      },
    })
    .then((user) => {
      if (user) {
        res.status(400).send({
          auth: false,
          id: req.body.id,
          message: "Error",
          errors: "Id is already taken!",
        });
        return;
      }

      //verification email
      prisma.user
        .findUnique({ where: { email: String(req.body.email) } })
        .then((user) => {
          if (user) {
            res.status(400).send({
              auth: false,
              id: req.body.id,
              message: "Error",
              errors: "Email is already taken!",
            });
            return;
          }
          next();
        });
    });
}
