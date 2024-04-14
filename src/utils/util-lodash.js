"use strict"
const _ = require("lodash");

class UtilLoadsh {

    pick(model, keys = []) {
        return _.pick(model, keys);
    }
}

module.exports = new UtilLoadsh();