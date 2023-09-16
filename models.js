const bookshelf = require("./config/bookshelf");

exports.Users = bookshelf.Model.extend({ tableName: "users" });