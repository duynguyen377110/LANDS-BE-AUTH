"use strict"
const express = require("express");
const amqpCore = require("./amqp/amqp-core");
const ControllerAuth = require("./controller/controller-auth");
const ControllerRole = require("./controller/constroller-role");
const ControllerUser = require("./controller/controller-user");
const app = express();

amqpCore(async () => {
    // AUTH
    await ControllerAuth.authSignup();
    await ControllerAuth.authSignin();
    await ControllerAuth.authSignout();
    
    // ROLE
    await ControllerRole.createRole();
    await ControllerRole.updateRole();
    await ControllerRole.deleteRole();

    // USER
    await ControllerUser.createUser();
    await ControllerUser.updateUser();
    await ControllerUser.deleteUser();
})

module.exports = app;
