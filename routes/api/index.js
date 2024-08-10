const route = require("express").Router();

const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

route.use("/users", userRoutes);
route.use("/thoughts", thoughtRoutes);

module.exports = route;