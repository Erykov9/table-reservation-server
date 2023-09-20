const bookshelf = require("./config/bookshelf");

exports.Users = bookshelf.Model.extend({ tableName: "users" });
exports.Restaurants = bookshelf.Model.extend({ tableName: "restaurant"});
exports.Tables = bookshelf.Model.extend({tableName: "tables"});
exports.Reservations = bookshelf.Model.extend({tableName: "reservations"});
