'use strict';

const dbConfig = require('../config/db.config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
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