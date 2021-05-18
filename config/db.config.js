// Sequelize connection establish and model defining 

'use strict';

require('dotenv').config();
const env = process.env;

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.DB_NAME, env.DB_USER, env.DB_PW, {
    host: env.HOST,
    dialect: env.dialect,
    operatorsAliases: 0,

    pool: {
        max: env.POOL.max,
        min: env.POOL.min,
        acquire: env.POOL.acquire,
        idle: env.POOL.idle
    }
});

module.exports = {
    sequelize
};