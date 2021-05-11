// Sequelize model for Vehicle

module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define("Vehicle", {
        name: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING(25),
            allowNull: false
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    
    Vehicle.sync();

    return Vehicle;
};