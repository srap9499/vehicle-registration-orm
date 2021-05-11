'use strict';


const db = require('../models/db.model');
const State = db.state;
const stateList = require('../data/state-list');

const stateArray = stateList.slice(0);

// Migrate State data from json file to database table
(async () => {
    try{
        await State.bulkCreate(stateArray, { validate: true });
        console.log('Inserted Successfully!');
    } catch(error) {
        console.log(error);
    }
})();