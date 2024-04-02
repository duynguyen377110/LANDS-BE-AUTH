"use strict"
const AmqpConsumer = require("../amqp/amqp-consumer");
const AmqpProducer = require("../amqp/amqp-reducer");
const configQueue = require("../config/config-queue");
const ServiceUser = require("../service/service-user");
const getCloud = require("../amqp/amqp-core").getCloud;

class ControllerUser {

    constructor() {}

    /**
     * CREATE USER
     */
    async createUser() {
        try {
            const CONNECT = getCloud();
            const ROLECONSUMER = configQueue.AUTH.USER.CONSUMMER_USER;
            const ROLEREFLY = configQueue.AUTH.USER.REFLY_USER;

            AmqpConsumer.consumer(CONNECT, ROLECONSUMER, async (information) => {
                let {fullName, email, password, phone, address, role} = information;
                let payload = await ServiceUser.createUser({fullName, email, password, phone, address, role});
                AmqpProducer.producer(CONNECT, ROLEREFLY, JSON.stringify(payload));
            })

        } catch (error) {
            throw error;
        }
    }

    /**
     * UPDATE USER
     */
    async updateUser() {
        try {
            const CONNECT = getCloud();
            const CONSUMER = configQueue.AUTH.UPDATE_USER.CONSUMMER_UPDATE_USER;
            const REFLY = configQueue.AUTH.UPDATE_USER.REFLY_UPDATE_USER;

            AmqpConsumer.consumer(CONNECT, CONSUMER, async (information) => {
                let {id, fullName, email, phone, address, role} = information;
                let payload = await ServiceUser.updateUser({id, fullName, email, phone, address, role});
                AmqpProducer.producer(CONNECT, REFLY, JSON.stringify(payload));
            })

        } catch (error) {
            throw error;
        }
    }

    /**
     * DELETE USER
     */
    async deleteUser() {
        try {
            const CONNECT = getCloud();
            const ROLECONSUMER = configQueue.AUTH.DELETE_USER.CONSUMMER_DELETE_USER;
            const ROLEREFLY = configQueue.AUTH.DELETE_USER.REFLY_DELETE_USER;

            AmqpConsumer.consumer(CONNECT, ROLECONSUMER, async (information) => {
                let {id} = information;
                let payload = await ServiceUser.deleteUser({id});
                AmqpProducer.producer(CONNECT, ROLEREFLY, JSON.stringify(payload));
            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControllerUser();