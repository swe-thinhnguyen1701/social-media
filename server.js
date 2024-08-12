const express = require("express");
const db = require("./config/connection");

const app = express();
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// routes

const PORT = 3001;
db.once("open", () => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    })
})