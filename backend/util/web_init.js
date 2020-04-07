const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const router = require('./router');

function initialize() {
    const app = express();

    // parse cross browser request
    app.use(cors());
    app.use(bodyParser.json());

    // parse requests of content-type: application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // simple route
    app.get("/", (req, res) => { res.json({ message: "Welcome to Basic to do list application." }); });

    // set the routers
    router(app);

    // set port, listen for requests
    app.listen(3000, () => { console.log("Server is running on port 3000."); });
}

module.exports = {initialize};
