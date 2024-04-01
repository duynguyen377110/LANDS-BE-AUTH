"use strict"
const getCloud = require("../amqp/amqp-core").getCloud;
const AmqpConsumer = require("../amqp/amqp-consumer");
const AmqpProducer = require("../amqp/amqp-reducer");
const configQueue = require("../config/config-queue");
const ServiceRole = require("../service/service-role");

class ControllerRole {

    constructor() { }

    /**
     * GET ALL ROLE
     */
    async getAllRole() {
        try {
            const CONNECT = getCloud();
            const ROLECONSUMER = configQueue.AUTH.ALL_ROLE.CONSUMMER_ALL_ROLE;
            const ROLEREFLY = configQueue.AUTH.ALL_ROLE.REFLY_ALL_ROLE;

            AmqpConsumer.consumer(CONNECT, ROLECONSUMER, async (information) => {
                let roles = await ServiceRole.getAllRole();
                AmqpProducer.producer(CONNECT, ROLEREFLY, JSON.stringify({roles}));
            })

        } catch (error) {
            throw error;
        }
    }

    /**
     * GET ROLE BY ID
     */
    async getRoleById() {
        try {
            const CONNECT = getCloud();
            const ROLECONSUMER = configQueue.AUTH.GET_ROLE_BY_ID.CONSUMMER_GET_ROLE_BY_ID;
            const ROLEREFLY = configQueue.AUTH.GET_ROLE_BY_ID.REFLY_GET_ROLE_BY_ID;

            AmqpConsumer.consumer(CONNECT, ROLECONSUMER, async (information) => {
                let { id } = information;
                let role = await ServiceRole.getRoleById(id);
                AmqpProducer.producer(CONNECT, ROLEREFLY, JSON.stringify({role}));
            })

        } catch (error) {
            throw error;
        }
    }

    /**
     * CREATE ROLE
     */
    async createRole() {
        try {
            const CONNECT = getCloud();
            const ROLECONSUMER = configQueue.AUTH.ROLE.CONSUMMER_ROLE;
            const ROLEREFLY = configQueue.AUTH.ROLE.REFLY_ROLE;

            AmqpConsumer.consumer(CONNECT, ROLECONSUMER, async (information) => {
                let { title } = information;
                let payload = await ServiceRole.createRole({title});
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
                let { id, title } = information;
                let payload = await ServiceRole.updateRole({id, title});
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