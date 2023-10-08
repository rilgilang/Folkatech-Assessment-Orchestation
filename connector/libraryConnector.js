require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const axios = require("axios");
const uri = process.env.LIBRARY_SERVICE;
const APIKEY = process.env.API_KEY;

class LibraryConnector {
  getBooks = async () => {
    try {
      const response = await axios.get(`${uri}/books`, {
        headers: {
          apikey: APIKEY,
        },
      });
      return {
        message: response.data.message,
        data: response.data.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        statusCode: error.response.status,
      };
    }
  };
  addBook = async (bookData) => {
    try {
      const response = await axios.post(`${uri}/book/add`, bookData, {
        headers: {
          apikey: APIKEY,
        },
      });

      return {
        message: response.data.message,
        data: response.data.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        statusCode: error.response.status,
      };
    }
  };

  borrowBook = async (borrowerData) => {
    try {
      const response = await axios.post(`${uri}/borrow`, borrowerData, {
        headers: {
          apikey: APIKEY,
        },
      });

      return {
        message: response.data.message,
        data: response.data.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        statusCode: error.response.status,
      };
    }
  };

  listBorrowed = async (user_id) => {
    try {
      const response = await axios.get(`${uri}/borrow/` + user_id, {
        headers: {
          apikey: APIKEY,
        },
      });
      return {
        message: response.data.message,
        data: response.data.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        statusCode: error.response.status,
      };
    }
  };
}

module.exports = LibraryConnector;
