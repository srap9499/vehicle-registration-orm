// Sequelize model for User

const Sequelize = require('sequelize');
const { sequelize } = require('../config/db.config');
const { State } = require('./state.model');

const User = sequelize.define("User", {
    id: {
        type: Sequelize.INTEGER(11),
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING(30),
        allowNull: false
    },
    email: {
        type: Sequelize.STRING(64),
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING(64),
        allowNull: false
    },
    state_id: {
        type: Sequelize.INTEGER(11),
        references: {
            model: 'States',
            key: 'ID'
        }
    },
    status: {
        type: Sequelize.ENUM('0', '1'),
        allowNull: false
    }
}, {
    timestamps: false,
    freezeTableName: true
});

State.hasMany(User, {
    foreignKey: "state_id"
});
User.belongsTo(State, {
    foreignKey: "state_id"
});

User.sync();

exports.User = User;