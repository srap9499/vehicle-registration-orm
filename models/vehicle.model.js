// Sequelize model for Vehicle

const Sequelize = require('sequelize');
const { sequelize } = require('../config/db.config');

const Vehicle = sequelize.define("Vehicle", {
    name: {
        type: Sequelize.STRING(64),
        allowNull: false,
    },
    type: {
        type: Sequelize.STRING(25),
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

Vehicle.sync();

exports.Vehicle = Vehicle;