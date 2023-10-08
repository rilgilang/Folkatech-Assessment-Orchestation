const validator = require("validator");

class LibraryHandler {
  constructor(libraryService) {
    this.libraryService = libraryService;
  }

  getBooks = async (req, res) => {
    try {
      const result = await this.libraryService.getBooks();
      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }
      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  addBookHandler = async (req, res) => {
    try {
      const errorMessages = [];
      const validate = ["title", "author", "stock"];

      validate.map((x) => {
        if (
          !req.body[x] ||
          req.body[x] === "" ||
          validator.isEmpty(`${req.body[x]}`)
        ) {
          errorMessages.push(`${x} cannot be empty`);
        }
      });

      if (errorMessages.length > 0) {
        return res.status(400).json({ message: errorMessages });
      }

      if (isNaN(req.body.stock)) {
        return res.status(400).json({ message: "stock must be number" });
      }

      let book = {
        title: req.body.title,
        author: req.body.author,
        stock: req.body.stock,
      };

      const result = await this.libraryService.addBook(book);

      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }

      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  borrowBook = async (req, res) => {
    try {
      const errorMessages = [];

      const validate = ["user_id", "book_id"];

      validate.map((x) => {
        if (
          !req.body[x] ||
          req.body[x] === "" ||
          validator.isEmpty(`${req.body[x]}`)
        ) {
          errorMessages.push(`${x} cannot be empty`);
        }
      });

      if (errorMessages.length > 0) {
        return res.status(400).json({ message: errorMessages });
      }

      if (req.user != req.body.user_id) {
        return res
          .status(401)
          .json({ message: "you cannot borrow with someone account" });
      }

      const result = await this.libraryService.borrowBook(
        req.headers.authorization,
        req.body
      );
      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }
      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  listBorrowerd = async (req, res) => {
    try {
      const result = await this.libraryService.listBorrowed(
        req.user,
        req.headers.authorization
      );
      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }
      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };
}

module.exports = LibraryHandler;
