const { Router } = require("express");
const router = Router();
const usersCtrl = require("../controller/user.controller");

router.get("/", usersCtrl.welcome);

router.post("/register", usersCtrl.register);

router.post("/login", usersCtrl.login);

router.get("/books", usersCtrl.getBooks);

router.get("/books?id_user&id_book", usersCtrl.getSpecificBook);

router.post("/books", usersCtrl.addBook);

router.put("/books", usersCtrl.updateBook);

// router.delete("/books", usersCtrl.deleteBook);

module.exports = router;
