const route = require("express").Router();

const userRoutes = require("./userRoutes");

route.use("/users");

module.exports = route;