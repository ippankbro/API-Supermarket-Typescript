import { Router } from "express";
import mailbox from "../controllers/mailBoxController";
import userController from "../controllers/userController";
import cashierController from "../controllers/cashierController";
import barangController from "../controllers/barangController";
import TransactioController from "../controllers/transactionController";

const route = Router();

route.get("/feed", mailbox.mailBoxfeed);
route.get("/post/:id", mailbox.getPost);
route.post("/post", mailbox.createPost);
route.put("/post/:id", mailbox.editPost);
route.delete("/post/:id", mailbox.deletePost);

//user route

route.get("/user/:username", userController.getUser);
route.post("/user", userController.createUser);

//cashier route

route.post("/cashier", cashierController.createCashier);
route.get("/cashier/:id", cashierController.getCashier);
route.put("/cashier/:id", cashierController.updateCashier);
route.delete("/cashier/:id", cashierController.deleteCashier);

//barang route
route.post("/barang", barangController.createBarang);
route.get("/barang/:sku", barangController.getBarang);
route.put("/barang/:sku", barangController.getBarang);
route.delete("/barang/:sku", barangController.deleteBarang);

//Transaction Route

route.post("/transaction", TransactioController.createTransaction);
route.get("/transactions", TransactioController.getTransaction);
route.delete("/transaction/:id", TransactioController.deleteTransaction);

//auth user
route.post("/signup");

export default route;
