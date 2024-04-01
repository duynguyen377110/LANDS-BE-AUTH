"use strict"

const configQueue = {
    AUTH: {
        SIGNIN: {
            CONSUMMER_SIGNIN: 'AUTH-SIGNIN',
            REFLY_SIGNIN: 'REFLY-AUTH-SIGNIN'
        },
        SIGNOUT: {
            CONSUMMER_SIGNOUT: 'AUTH-SIGNOUT',
            REFLY_SIGNOUT: 'REFLY-AUTH-SIGNOUT'
        },
        ROLE: {
            CONSUMMER_ROLE: 'AUTH-ROLE',
            REFLY_ROLE: 'REFLY-AUTH-ROLE'
        },
        DELETE_ROLE: {
            CONSUMMER_DELETE_ROLE: 'AUTH-DELETE-ROLE',
            REFLY_DELETE_ROLE: 'REFLY-AUTH-DELETE-ROLE'
        }
    }
}

module.exports = configQueue;