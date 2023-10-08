require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const axios = require("axios");
const uri = process.env.USER_SERVICE; // Add URI MongoDB Atlas

const APIKEY = process.env.API_KEY;

class UserConnector {
  login = async (username, password) => {
    try {
      const response = await axios.post(
        `${uri}/login`,
        {
          username,
          password,
        },
        {
          headers: {
            apikey: APIKEY,
          },
        }
      );

      return {
        message: response.data.message,
        data: response.data.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        statusCode: error.response.data.statusCode,
      };
    }
  };

  register = async (
    username,
    account_number,
    email,
    password,
    identity_number
  ) => {
    try {
      const response = await axios.post(
        `${uri}/register`,
        {
          username: username,
          account_number: account_number,
          email: email,
          password: password,
          identity_number: identity_number,
        },
        {
          headers: {
            apikey: APIKEY,
          },
        }
      );

      return {
        message: response.data.message,
        data: response.data.data,
        statusCode: response.status,
      };
    } catch (error) {
      return {
        message: error.response.data.message,
        statusCode: error.response.data.statusCode,
      };
    }
  };

  updateProfile = async (
    authorization,
    email,
    account_number,
    identity_number
  ) => {
    try {
      const response = await axios.put(
        `${uri}/user/update`,
        {
          email,
          account_number,
          identity_number,
        },
        {
          headers: {
            apikey: APIKEY,
            authorization: authorization,
          },
        }
      );
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

  deleteAccount = async (authorization) => {
    try {
      const response = await axios.delete(`${uri}/user/delete`, {
        data: { confirmation: "delete" },
        headers: {
          apikey: APIKEY,
          authorization: authorization,
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

  getUsers = async (account_number, identity_number) => {
    try {
      const response = await axios.get(`${uri}/user`, {
        params: {
          account_number,
          identity_number,
        },
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

  checkToken = async (authorization) => {
    try {
      const response = await axios.get(`${uri}/check`, {
        headers: {
          authorization: authorization,
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

module.exports = UserConnector;
