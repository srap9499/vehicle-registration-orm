'use strict';


(async () => {
    const db = require('../models/db.model');
    const State = await db.state;
    const stateList = require('../data/state-list');
    
    const stateArray = stateList.slice(0);
        
    try{
        await State.bulkCreate(stateArray, { validate: true });
        console.log('Inserted Successfully!');
    } catch(error) {
        console.log(error);
    }
})();