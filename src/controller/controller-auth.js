"use strict"
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpConsumer = require("../amqp/amqp-consumer");
const AmqpProducer = require("../amqp/amqp-reducer");
const configQueue = require("../config/config-queue");

class ControllerAuth {

    constructor() { }

    async authSignin() {
        try {
            const CONNECT = getCloud();
            const AUTHCONSUMER = configQueue.AUTH.SIGNIN.CONSUMMER_SIGNIN;
            const AUTHREFLY = configQueue.AUTH.SIGNIN.REFLY_SIGNIN;

            AmqpConsumer.consumer(CONNECT, AUTHCONSUMER, (information) => {
                console.log(information);
            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControllerAuth();