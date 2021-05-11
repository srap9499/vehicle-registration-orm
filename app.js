'use strict';

const express = require('express');

const { errorHandler } = require('./middlewares/error-handler.middleware');

const app = express();

const port = process.env.PORT | 3000;


// Request body parser
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req, res, next) => {
    res.send('hello');
})

const vehicleRouter = require('./routes/vehicle.routes');
const userRouter = require('./routes/user.routes');
const vehicleRegistrationRouter = require('./routes/vehicle-registration.routes');
const listWithVehicleStateRouter = require('./routes/list-with-vehicle-state.routes');
const listWithVehicleRouter = require('./routes/list-with-vehicle.routes');
const exportToCsvRouter = require('./routes/export-to-csv.routes');

app.use('/vehicle', vehicleRouter);
app.use('/user', userRouter);
app.use('/vehicleRegistration', vehicleRegistrationRouter);
app.use('/listWithVehicleState',listWithVehicleStateRouter);
app.use('/listWithVehicle',listWithVehicleRouter);
app.use('/exportToCsv', exportToCsvRouter);

// Error handler middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port: ${port}` );
});