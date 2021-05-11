// Database configuration

module.exports = {
    HOST: 'localhost',
    USER: 'demo',
    PASSWORD: 'demo123',
    DB: 'vehicle_registration_db',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};