"use strict"
const stringify = require('json-stringify-safe');
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpConsumer = require("../amqp/amqp-consumer");
const AmqpProducer = require("../amqp/amqp-reducer");
const configQueue = require("../config/config-queue");
const ServiceAccess = require("../service/service-access");

class ControllerAuth {

    constructor() { }

    /**
     * USER SIGNUP
     */
    async authSignup() {
        const CONNECT = getCloud();
            const CONSUMER = configQueue.AUTH.SIGNUP.COMSUMER_SIGNUP;
            const REFLY = configQueue.AUTH.SIGNUP.REFLY_SIGNUP;

            await AmqpConsumer.consumer(CONNECT, CONSUMER, async (information) => {
                let { fullName, email, password, phone, address } = information;
                let infor = {fullName, email, password, phone, address}
                let payload = await ServiceAccess.clientSignup(infor);
                await AmqpProducer.producer(CONNECT, REFLY, stringify(payload));
            })
    }

    /**
     * USER SIGNIN
     */
    async authSignin() {
        try {
            const CONNECT = getCloud();
            const AUTHCONSUMER = configQueue.AUTH.SIGNIN.CONSUMMER_SIGNIN;
            const AUTHREFLY = configQueue.AUTH.SIGNIN.REFLY_SIGNIN;

            await AmqpConsumer.consumer(CONNECT, AUTHCONSUMER, async (information) => {
                let { email, password } = information;
                let payload = await ServiceAccess.userSignin({email, password});
                await AmqpProducer.producer(CONNECT, AUTHREFLY, stringify(payload));
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

            await AmqpConsumer.consumer(CONNECT, AUTHCONSUMER, async (information) => {
                let { email } = information;
                let payload = await ServiceAccess.userSignout({email});
                await AmqpProducer.producer(CONNECT, AUTHREFLY, JSON.stringify(payload));
            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControllerAuth();