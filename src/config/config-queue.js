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
        // ROLE
        ROLE: {
            CONSUMMER_ROLE: 'AUTH-ROLE',
            REFLY_ROLE: 'REFLY-AUTH-ROLE'
        },
        ALL_ROLE: {
            CONSUMMER_ALL_ROLE: 'AUTH-ALL-ROLE',
            REFLY_ALL_ROLE: 'REFLY-AUTH-ALL-ROLE'
        },
        GET_ROLE_BY_ID: {
            CONSUMMER_GET_ROLE_BY_ID: 'AUTH_GET-ROLE-BY-ID',
            REFLY_GET_ROLE_BY_ID: 'REFLY-AUTH_GET-ROLE-BY-ID'
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
        ALL_USER: {
            CONSUMMER_ALL_USER: 'AUTH-ALL-USER',
            REFLY_ALL_USER: 'REFLY-AUTH-ALL-USER'
        },
        GET_USER_BY_ID: {
            CONSUMMER_GET_USER_BY_ID: 'AUTH_GET-USER-BY-ID',
            REFLY_GET_USER_BY_ID: 'REFLY-AUTH_GET-USER-BY-ID'
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