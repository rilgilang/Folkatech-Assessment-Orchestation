const express = require("express");
const UserService = require("./service/userService");
const UserConnector = require("./connector/userConnector");
const UserHandlers = require("./handlers/userHandler");
const checkBearer = require("./middleware/checkBearer");
const LibraryService = require("./service/libraryService");
const LibraryHandler = require("./handlers/libraryHandler");
const LibraryConnector = require("./connector/libraryConnector");

const router = express.Router();

//connector
const useConnector = new UserConnector();
const libraryConnector = new LibraryConnector();

//service
const userService = new UserService(useConnector);
const libraryService = new LibraryService(libraryConnector, useConnector);

//handlers
const userHandler = new UserHandlers(userService);
const libraryHandler = new LibraryHandler(libraryService);

router.post("/login", userHandler.loginHandler);

router.post("/register", userHandler.registerHandler);

router.put("/user/update", checkBearer, userHandler.updateUserHandler);

router.delete("/user/delete", checkBearer, userHandler.deleteHandler);

router.get("/user", userHandler.getUserHandler);

router.get("/books", libraryHandler.getBooks);

router.post("/book/add", libraryHandler.addBookHandler);

router.post("/borrow", checkBearer, libraryHandler.borrowBook);

router.get("/borrow", checkBearer, libraryHandler.listBorrowerd);

module.exports = router;
