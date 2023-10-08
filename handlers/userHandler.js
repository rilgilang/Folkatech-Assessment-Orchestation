const validator = require("validator");

class UserHandlers {
  constructor(userService, passport) {
    this.userService = userService;
  }

  loginHandler = async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await this.userService.login(username, password);

      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }

      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  registerHandler = async (req, res) => {
    try {
      const errorMessages = [];
      const validate = [
        "username",
        "account_number",
        "email",
        "identity_number",
        "password",
      ];

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

      if (!validator.isEmail(req.body.email)) {
        errorMessages.push(`email not valid`);
      }

      if (errorMessages.length > 0) {
        return res.status(400).json({ message: errorMessages });
      }

      let user = {
        username: req.body.username,
        password: req.body.password,
        account_number: req.body.account_number,
        email: req.body.email,
        identity_number: req.body.identity_number,
      };

      const result = await this.userService.addUser(user);

      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }

      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  updateUserHandler = async (req, res) => {
    try {
      if (
        !req.body.email &&
        !req.body.account_number &&
        !req.body.identity_number
      ) {
        return res.status(400).json({
          message: `need one of these to update email, account_number, identity_number`,
        });
      }

      if (req.body.email && !validator.isEmail(req.body.email)) {
        return res.status(400).json({
          message: `email not valid`,
        });
      }

      let user = {
        account_number: req.body.account_number,
        email: req.body.email,
        identity_number: req.body.identity_number,
      };

      const result = await this.userService.updateUser(
        req.headers.authorization,
        user
      );

      if (result.statusCode != 200) {
        return res.status(result.statusCode).json({ message: result.message });
      }

      return res.status(200).json({ message: "success", data: result.data });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  };

  deleteHandler = async (req, res) => {
    try {
      const { confirmation } = req.body;

      if (!confirmation) {
        return res.status(400).json({
          message: `confirmation cannot be empty`,
        });
      }

      if (confirmation != "delete") {
        return res.status(400).json({
          message: `confirmation must be "delete"`,
        });
      }

      const result = await this.userService.deleteUser(
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

  getUserHandler = async (req, res) => {
    try {
      const { account_number, identity_number } = req.query;

      if (account_number && identity_number) {
        return res.status(400).json({
          message: "cannot receive multiple params choose one",
        });
      }

      const result = await this.userService.getUser(
        account_number,
        identity_number
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

module.exports = UserHandlers;
