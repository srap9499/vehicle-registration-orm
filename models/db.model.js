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

const db = {};

db.state = require('./state.model')(sequelize, Sequelize);
db.vehicle = require('./vehicle.model')(sequelize, Sequelize);
db.user = require('./user.model')(sequelize, Sequelize);
db.vehicleRegistration = require('./vehicle-registration.model')(sequelize, Sequelize);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;