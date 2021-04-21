'use strict';

const express = require('express');

const app = express();

const port = process.env.PORT | 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get('/', (req,res) => {
    res.send('hello');
})

const vehicleRouter = require('./routes/vehicle.routes');
const userRouter = require('./routes/user.routes');
const vehicleRegistrationRouter = require('./routes/vehicle-registration.routes');

app.use('/vehicle', vehicleRouter);
app.use('/user', userRouter);
app.use('/vehicleRegistration', vehicleRegistrationRouter);

app.listen(port, () => {
    console.log(`Server started on port: ${port}` );
});