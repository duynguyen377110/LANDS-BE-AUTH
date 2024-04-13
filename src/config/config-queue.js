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
        SIGNUP: {
            COMSUMER_SIGNUP: 'AUTH-SIGNUP',
            REFLY_SIGNUP: 'REFLY-AUTH-SIGNUP'
        },
        // ROLE
        ROLE: {
            CONSUMMER_ROLE: 'AUTH-ROLE',
            REFLY_ROLE: 'REFLY-AUTH-ROLE'
        },
        UPDATE_ROLE: {
            CONSUMMER_UPDATE_ROLE: 'AUTH-UPDATE-ROLE',
            REFLY_UPDATE_ROLE: 'REFLY-AUTH-UPDATE-ROLE'
        },
        DELETE_ROLE: {
            CONSUMMER_DELETE_ROLE: 'AUTH-DELETE-ROLE',
            REFLY_DELETE_ROLE: 'REFLY-AUTH-DELETE-ROLE'
        },
        // USER
        USER: {
            CONSUMMER_USER: 'AUTH-USER',
            REFLY_USER: 'REFLY-AUTH-USER'
        },
        UPDATE_USER: {
            CONSUMMER_UPDATE_USER: 'AUTH-UPDATE-USER',
            REFLY_UPDATE_USER: 'REFLY-AUTH-UPDATE-USER'
        },
        DELETE_USER: {
            CONSUMMER_DELETE_USER: 'AUTH-DELETE-USER',
            REFLY_DELETE_USER: 'REFLY-AUTH-DELETE-USER'
        }
    }
}

module.exports = configQueue;