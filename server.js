"use strict"
const app = require("./src/index");
const Instance = require("./src/utils/util-db");
const environment = require("./environment");

app.listen(process.env.PORT || environment.port, (err) => {
    if(err) console.log("Start server auth unsuccess");
    console.log("Start server auth success");
})