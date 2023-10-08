class UserService {
  constructor(userConnector) {
    this.userConnector = userConnector;
  }

  getUsers = async (params) => {
    const data = await this.userConnector.findAll(params);
    return { message: "success", data: data, statusCode: 200 };
  };

  addUser = async (userData) => {
    const response = await this.userConnector.register(
      userData.username,
      userData.account_number,
      userData.email,
      userData.password,
      userData.identity_number
    );

    if (response.statusCode != 200) {
      return {
        message: response.message,
        statusCode: 422,
      };
    }
    return { message: "success", data: response.data, statusCode: 200 };
  };

  login = async (username, password) => {
    const response = await this.userConnector.login(username, password);

    if (response.statusCode != 200) {
      return {
        message: response.message,
        statusCode: response.statusCode,
      };
    }

    return { message: "success", data: response.data, statusCode: 200 };
  };

  updateUser = async (authorization, userData) => {
    const response = await this.userConnector.updateProfile(
      authorization,
      userData.email,
      userData.account_number,
      userData.identity_number
    );

    if (response.statusCode != 200) {
      return { message: response.message, statusCode: response.statusCode };
    }

    return { message: "success", data: response.data, statusCode: 200 };
  };

  deleteUser = async (authorization) => {
    const response = await this.userConnector.deleteAccount(authorization);

    if (response.statusCode != 200) {
      return { message: response.message, statusCode: response.statusCode };
    }

    return { message: "success", data: response.data, statusCode: 200 };
  };

  getUser = async (account_number, identity_number) => {
    const response = await this.userConnector.getUsers(
      account_number,
      identity_number
    );

    if (response.statusCode != 200) {
      return { message: response.message, statusCode: response.statusCode };
    }

    return { message: "success", data: response.data, statusCode: 200 };
  };
}

module.exports = UserService;
