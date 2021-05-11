module.exports = (sequelize, Sequelize) => {
    const State = sequelize.define("States", {
        ID: {
            type: Sequelize.INTEGER(11)        ,
            autoIncrement: true,
            primaryKey: true,
        },
        StateName: {
            type: Sequelize.STRING(64),
            allowNull: false,
        },
        DateCreated: {
            type: Sequelize.DATE,
            allowNull: false
        },
        DateModified: {
            type: Sequelize.DATE,
            allowNull: false
        },
        Status: {
            type: Sequelize.ENUM('0','1'),
            allowNull: false
        }
    },{
        timestamps: false,
        freezeTableName: true
    });
    
    State.sync();

    return State;
};