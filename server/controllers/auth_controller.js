const users = require("../models/users");
let id = 1;

module.exports = {
  login: (req, res, next) => {
    let { username, password } = req.body;
  },

  register: (req, res, next) => {},

  signout: (req, res, next) => {},

  getUser: (req, res, next) => {}
};
