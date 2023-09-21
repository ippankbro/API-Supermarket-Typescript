import { Router } from "express";
import mailbox from "../controllers/mailBoxController";
import userController from "../controllers/userController";
const route = Router();

route.get("/feed", mailbox.mailBoxfeed);
route.get("/post/:id", mailbox.getPost);
route.post("/post", mailbox.createPost);
route.put("/post/:id", mailbox.editPost);
route.delete("/post/:id", mailbox.deletePost);

//user route

route.get("/user", userController.getUser);
route.post("/:username", userController.createUser);

export default route;
