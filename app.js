'use strict';

const path = require('path');
const express = require('express');
require('dotenv').config();

const { errorHandler } = require('./middlewares/error-handler.middleware');

const vehicleRouter = require('./routes/vehicle.routes');
const userRouter = require('./routes/user.routes');
const vehicleRegistrationRouter = require('./routes/vehicle-registration.routes');
const listWithVehicleStateRouter = require('./routes/list-with-vehicle-state.routes');
const listWithVehicleRouter = require('./routes/list-with-vehicle.routes');
const exportToCsvRouter = require('./routes/export-to-csv.routes');

const { sequelize } = require('./config/db.config');

const app = express();

const PORT = process.env.APP_PORT;

app.set('view engine', 'ejs');
app.set('views', 'views');

// Request body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
    res.send('hello');
})

app.use('/vehicle', vehicleRouter);
app.use('/user', userRouter);
app.use('/vehicleRegistration', vehicleRegistrationRouter);
app.use('/listWithVehicleState', listWithVehicleStateRouter);
app.use('/listWithVehicle', listWithVehicleRouter);
app.use('/exportToCsv', exportToCsvRouter);

// Error handler middleware
app.use(errorHandler);

sequelize.sync({ force: false, logging: false })
    .then(result => {
        app.listen(PORT, () => {
            console.log(`Server started on port: ${PORT}`);
        });
    })
    .catch(err => {
        console.log(err.name, err.message);
    });