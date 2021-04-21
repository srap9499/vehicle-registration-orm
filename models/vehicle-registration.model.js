module.exports = (sequelize, Sequelize) => {
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

    VehicleRegistration.sync();

    return VehicleRegistration;
};