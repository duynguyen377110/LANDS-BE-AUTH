"use strict"
const express = require("express");
const amqpCore = require("./amqp/amqp-core");
const ControllerAuth = require("./controller/controller-auth");
const app = express();

amqpCore(async () => {
    await ControllerAuth.authSignin();
    
})

module.exports = app;
