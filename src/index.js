"use strict"
const express = require("express");
const amqpCore = require("./amqp/amqp-core");
const ControllerAuth = require("./controller/controller-auth");
const ControllerRole = require("./controller/constroller-role");
const app = express();

amqpCore(async () => {
    // AUTH
    await ControllerAuth.authSignin();
    await ControllerAuth.authSignout();
    
    // ROLE
    await ControllerRole.createRole();
    await ControllerRole.updateRole();
    await ControllerRole.deleteRole();
})

module.exports = app;
