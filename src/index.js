"use strict"
const express = require("express");
const amqpCore = require("./amqp/amqp-core");
const app = express();

amqpCore(() => {
    
})

module.exports = app;
