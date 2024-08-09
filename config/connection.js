const { connect, connection } = require("mongoose");

connect("mongodb://localhost:27017/socialMedia");

module.exports = connection;