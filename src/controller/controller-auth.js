"use strict"
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpConsumer = require("../amqp/amqp-consumer");
const AmqpProducer = require("../amqp/amqp-reducer");
const configQueue = require("../config/config-queue");
const ServiceAccess = require("../service/service-access");

class ControllerAuth {

    constructor() { }

    /**
     * USER SIGNIN
     */
    async authSignin() {
        try {
            const CONNECT = getCloud();
            const AUTHCONSUMER = configQueue.AUTH.SIGNIN.CONSUMMER_SIGNIN;
            const AUTHREFLY = configQueue.AUTH.SIGNIN.REFLY_SIGNIN;

            AmqpConsumer.consumer(CONNECT, AUTHCONSUMER, async (information) => {
                let { email, password } = information;
                let payload = await ServiceAccess.userSignin({email, password});
                AmqpProducer.producer(CONNECT, AUTHREFLY, JSON.stringify(payload));
            })

        } catch (error) {
            throw error;
        }
    }

    /**
     * USER SIGNOUT
     */
    async authSignout() {
        try {
            const CONNECT = getCloud();
            const AUTHCONSUMER = configQueue.AUTH.SIGNOUT.CONSUMMER_SIGNOUT;
            const AUTHREFLY = configQueue.AUTH.SIGNOUT.REFLY_SIGNOUT;

            AmqpConsumer.consumer(CONNECT, AUTHCONSUMER, async (information) => {
                let { email } = information;
                let payload = await ServiceAccess.userSignout({email});
                AmqpProducer.producer(CONNECT, AUTHREFLY, JSON.stringify(payload));
            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControllerAuth();