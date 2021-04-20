'use strict';

const stateList = require('./state list.json');

stateList.forEach(state => {
    state.DateCreated = state.DateCreated.replace("T", " ");
    state.DateCreated = state.DateCreated.replace("Z", "");
    state.DateModified = state.DateModified.replace("T", " ");
    state.DateModified = state.DateModified.replace("Z", "");
    state.Status = state.Status == true ? 1 : 0;
});

module.exports = stateList;