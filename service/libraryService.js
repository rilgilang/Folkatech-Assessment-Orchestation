class LibraryService {
  constructor(libraryConnector, userConnector) {
    this.userConnector = userConnector;
    this.libraryConnector = libraryConnector;
  }
  getBooks = async () => {
    const response = await this.libraryConnector.getBooks();
    if (response.statusCode != 200) {
      return {
        message: response.message,
        statusCode: response.statusCode,
      };
    }

    return { message: "success", data: response.data, statusCode: 200 };
  };

  addBook = async (bookData) => {
    const result = await this.libraryConnector.addBook(bookData);
    if (response.statusCode != 200) {
      return {
        message: response.message,
        statusCode: response.statusCode,
      };
    }
    return { message: "success", data: result.data, statusCode: 200 };
  };

  borrowBook = async (authorization, borrowerData) => {
    const currentUser = await this.userConnector.checkToken(authorization);
    if (currentUser.statusCode != 200) {
      return {
        message: response.message,
        statusCode: response.statusCode,
      };
    }
    const response = await this.libraryConnector.borrowBook(borrowerData);

    if (response.statusCode != 200) {
      return {
        message: response.message,
        statusCode: response.statusCode,
      };
    }
    return { message: "success", data: response.data, statusCode: 200 };
  };

  listBorrowed = async (user_id, authorization) => {
    const currentUser = await this.userConnector.checkToken(authorization);
    if (currentUser.statusCode != 200) {
      return {
        message: currentUser.message,
        statusCode: currentUser.statusCode,
      };
    }
    const response = await this.libraryConnector.listBorrowed(user_id);

    if (response.statusCode != 200) {
      return {
        message: response.message,
        statusCode: response.statusCode,
      };
    }
    return { message: "success", data: response.data, statusCode: 200 };
  };
}

module.exports = LibraryService;
