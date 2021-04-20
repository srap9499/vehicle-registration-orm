module.exports = (sequelize, Sequelize) => {
    const Vehicle = sequelize.define("Vehicle", {
        id: {
            type: Sequelize.INTEGER(11),
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING(25),
            allowNull: false
        }
    },{
        timestamps: false
    });
    
    Vehicle.sync();

    return Vehicle;
};