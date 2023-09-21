import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

export function mailBoxfeed(req: Request, res: Response) {
  prisma.post
    .findMany({
      include: { author: true },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

export function createPost(req: Request, res: Response) {
  const { content, authorEmail } = req.body;
  prisma.post
    .create({
      data: {
        content,
        author: { connect: { email: authorEmail } },
      },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

//get post

export function getPost(req: Request, res: Response) {
  const { id } = req.params;
  prisma.post
    .findUnique({
      where: { id: Number(id) },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ eror: err });
    });
}

// Edit post

export function editPost(req: Request, res: Response) {
  const { id } = req.params;
  prisma.post
    .update({
      where: { id: Number(id) },
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

//delete Post

export function deletePost(req: Request, res: Response) {
  const { id } = req.params;
  prisma.post
    .delete({
      where: { id: Number(id) },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json({ error: err });
    });
}

const MailboxController = {
  mailBoxfeed,
  createPost,
  getPost,
  editPost,
  deletePost,
};

export default MailboxController;
