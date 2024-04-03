"use strict"
const environment = {
    model: {
        dev: {
            db: 'mongodb://127.0.0.1:27017/lands',
            queue: 'amqps://nciukfke:tfRF0Brz8Q0PvkXI-ELFMQrFbB53q3DN@armadillo.rmq.cloudamqp.com/nciukfke',
            port: 8084

        },
        pro: {
            db: 'mongodb+srv://duy366110:A6XzLL3lblXeKH40@management.fr9ayxi.mongodb.net/lands-store?retryWrites=true&w=majority',
            queue: 'amqps://nciukfke:tfRF0Brz8Q0PvkXI-ELFMQrFbB53q3DN@armadillo.rmq.cloudamqp.com/nciukfke',
            port: 8084
        }
    },
}


module.exports = environment.model.pro;