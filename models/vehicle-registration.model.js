// Sequelize model for Vehicle Registration

const Sequelize = require('sequelize');
const { sequelize } = require('../config/db.config');
const { User } = require('./user.model');
const { Vehicle } = require('./vehicle.model');

const VehicleRegistration = sequelize.define("VehicleRegistration", {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    vehicle_id: {
        type: Sequelize.INTEGER(11),
        allowNull: false,
        references: {
            model: 'Vehicle',
            key: 'id'
        }
    },
    registration_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    expiry_date: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

User.hasMany(VehicleRegistration, {
    foreignKey: "user_id"
});
VehicleRegistration.belongsTo(User, {
    foreignKey: "user_id"
});
Vehicle.hasMany(VehicleRegistration, {
    foreignKey: "vehicle_id"
});
VehicleRegistration.belongsTo(Vehicle, {
    foreignKey: "vehicle_id"
});

VehicleRegistration.sync();

exports.VehicleRegistration = VehicleRegistration;