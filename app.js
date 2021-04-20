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

app.use('/vehicle', vehicleRouter);

app.listen(port, () => {
    console.log(`Server started on port: ${port}` );
});