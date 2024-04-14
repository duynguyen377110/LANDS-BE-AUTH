"use strict"
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpConsumer = require("../amqp/amqp-consumer");
const AmqpProducer = require("../amqp/amqp-reducer");
const configQueue = require("../config/config-queue");
const ServiceRole = require("../service/service-role");

class ControllerRole {

    constructor() { }

    /**
     * CREATE ROLE
     */
    async createRole() {
        try {
            const CONNECT = getCloud();
            const ROLECONSUMER = configQueue.AUTH.ROLE.CONSUMMER_ROLE;
            const ROLEREFLY = configQueue.AUTH.ROLE.REFLY_ROLE;

            AmqpConsumer.consumer(CONNECT, ROLECONSUMER, async (information) => {
                let { title, slug } = information;
                let payload = await ServiceRole.createRole({title, slug});
                AmqpProducer.producer(CONNECT, ROLEREFLY, JSON.stringify(payload));
            })

        } catch (error) {
            throw error;
        }
    }

    /**
     * UPDATE ROLE
     */
    async updateRole() {
        try {
            const CONNECT = getCloud();
            const UPDATEROLECONSUMER = configQueue.AUTH.UPDATE_ROLE.CONSUMMER_UPDATE_ROLE;
            const UPDATEROLEREFLY = configQueue.AUTH.UPDATE_ROLE.REFLY_UPDATE_ROLE;

            AmqpConsumer.consumer(CONNECT, UPDATEROLECONSUMER, async (information) => {
                let { id, title, slug } = information;
                let payload = await ServiceRole.updateRole({id, title, slug});
                AmqpProducer.producer(CONNECT, UPDATEROLEREFLY, JSON.stringify(payload));
            })

        } catch (error) {
            throw error;
        }
    }


    /**
     * DELETE ROLE
     */
    async deleteRole() {
        try {
            const CONNECT = getCloud();
            const DELETEROLECONSUMER = configQueue.AUTH.DELETE_ROLE.CONSUMMER_DELETE_ROLE;
            const DELETEROLEREFLY = configQueue.AUTH.DELETE_ROLE.REFLY_DELETE_ROLE;

            AmqpConsumer.consumer(CONNECT, DELETEROLECONSUMER, async (information) => {
                let { id } = information;
                let payload = await ServiceRole.deleteRole({id});
                AmqpProducer.producer(CONNECT, DELETEROLEREFLY, JSON.stringify(payload));
            })

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ControllerRole();