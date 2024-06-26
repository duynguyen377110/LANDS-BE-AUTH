"use strict"
const ModelAccess = require("../model/model-access");
const ServiceRole = require("../service/service-role");
const ServiceUser = require("../service/service-user");
const UtilBcrypt = require("../utils/util-bcrypt");
const UtilCrypto = require("../utils/util-crypto");
const UtilJwt = require("../utils/util-jwt");
const UtilLoadsh = require("../utils/util-lodash");

class ServiceAccess {
    keys = [
        'user._id',
        'user.fullName',
        'user.email',
        'user.phone',
        'user.address',
        "accessToken",
        "refreshToken"
    ];

    constructor() { }

    /**
     * GENERAL ACCESS TOKEN
     * @param {*} user 
     * @returns 
     */
    generalAccessToken(user = {}) {
        let { publicKey, privateKey } = UtilCrypto.generateKeyPairSync();
        let accessToken = UtilJwt.sign({
            id: user._id,
            email: user.email,
            phone: user.phone,
            address: user.address
        }, privateKey, 'AccessToken');

        let refreshToken = UtilJwt.sign({
            id: user._id,
            email: user.email,
            phone: user.phone,
            address: user.address
        }, privateKey, 'RefreshToken');

        return {publicKey, accessToken, refreshToken};
    }

    /**
     * CREATE USER ACCESS
     * @param {*} user 
     * @param {*} publicKey 
     * @param {*} accessToken 
     * @param {*} refreshToken 
     * @returns 
     */
    async createUserAccess(user = {}, publicKey = '', accessToken = "", refreshToken = '') {
        try {
            return await ModelAccess.create({
                user, publicKey, accessToken, refreshToken, status: true
            })

        } catch (error) {
            throw error;
        }
    }

    /**
     * 
     * @param {*} user 
     * @returns 
     */
    async findUserAccessByUserModel(user = {}) {
        try {
            return await ModelAccess
                        .findOne({
                            user: {$eq: user}
                        })
                        .populate({
                            path: 'user'
                        })
                        .exec();

        } catch (error) {
            throw error;
        }
    }

    /**
     * CLIENT SIGNUP ACCOUNT
     * @param {*} infor 
     */
    async clientSignup(infor = {}) {
        try {
            let role = await ServiceRole.findRoleByName("Client");
            infor.role = role._id.toString();

            let { status, user, role: role_key } = await ServiceUser.createUser(infor);

            if(!status && !user) {
                return { status: false, message: 'Signup unsuccess'};

            } else {
                let {publicKey, accessToken, refreshToken } = this.generalAccessToken(user);
                let access = await this.createUserAccess(user, publicKey, accessToken, refreshToken);

                
                if(!access) { 
                    return { status: false, message: 'Signup unsuccess', access: null};
                }

                let access_cv = UtilLoadsh.pick(access, this.keys);
                access_cv['slug'] = user.role.slug;
                
                return { status: true, message: 'Signup success', access: access_cv};
            }

        } catch (error) {
            return { status: false, message: 'Signup unsuccess', error};
        }
    }

    /**
     * USER SIGNIN
     * @param {*} infor 
     * @returns 
     */
    async userSignin(infor = {}) {
        try {
            let user = await ServiceUser.findUserByEmail(infor.email);

            if(!user) {
                return { status: false, message: 'Not found user', access: null};
            }

            let comparePassword = UtilBcrypt.compare(infor.password, user.password);
            if(!comparePassword) {
                return { status: false, message: 'Password not match', access: null};
            }

            let access = await this.findUserAccessByUserModel(user);
            let {publicKey, accessToken, refreshToken } = this.generalAccessToken(user);

            if(!access) {
                access = {};
                access = await this.createUserAccess(user, publicKey, accessToken, refreshToken);

            } else {
                // if(access.status) return {status: false, message: 'Account existing', access: null};
                access.publicKey = publicKey;
                access.accessToken = accessToken;
                access.refreshToken = refreshToken;
                access.status = true;
                await access.save();
            }

            let access_cv = UtilLoadsh.pick(access, this.keys);
            access_cv.slug = user.role.slug;

            return {
                status: true,
                message: 'signin success',
                access: access_cv,
            }

        } catch (error) {
            throw error;
        }
    }

    /**
     * USER SIGNOUT
     * @param {*} infor 
     * @returns 
     */
    async userSignout(infor = {}) {
        try {
            let user = await ServiceUser.findUserByEmail(infor.email);
            if(!user) {
                return { status: false, message: 'Not found user'};
            }

            let access = await this.findUserAccessByUserModel(user);
            access.publicKey = '';
            access.accessToken = '';
            access.tokens.push(access.refreshToken);
            access.refreshToken = '';
            access.status = false;
            await access.save()

            return {
                status: true,
                message: 'User signout success'
            }

        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ServiceAccess();