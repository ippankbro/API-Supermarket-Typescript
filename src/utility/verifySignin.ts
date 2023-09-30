import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

dotenv.config();

export function signin(req: Request, res: Response) {
  prisma.user
    .findUnique({
      where: {
        id: Number(req.body.id),
      },
    })
    .then((user) => {
      if (!user) {
        res.status(404).send({
          auth: false,
          id: req.body.id,
          accessToken: null,
          message: "Error",
          errors: "User Not Found.",
        });
        return;
      }

      const passwordIsValid = bcryptjs.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        res.status(401).send({
          auth: false,
          id: req.body.id,
          accessToken: null,
          message: "Error",
          errors: "Invalid Password!",
        });
        return;
      }
      const token =
        "Bearer " +
        jwt.sign(
          {
            id: user.id,
          },
          String(process.env.SECRET_STRING),
          {
            expiresIn: 86400, //24h expired
          }
        );

      res.status(200).send({
        auth: true,
        id: req.body.id,
        accessToken: token,
        message: "Error",
        errors: null,
      });
    });
}
