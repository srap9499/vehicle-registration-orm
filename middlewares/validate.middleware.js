'use strict';

exports.createUser = async (req, res, next) => {
    try {
        const { Name, Email, Password, StateID, Status } = req.body;
        if (!Name || !Email || !Password || !StateID || !Status) {
            res.status(400).send('Please provide all required fields');
        } else {
            req.userData = {
                name: Name,
                email: Email,
                password: Password,
                state_id: StateID,
                status: Status == true ? '1' : '0'
            }
            next();
        }
    } catch(error) {
        console.log('Error occured while validating input for create user: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        console.log(req.params.id);

        const { Name, Email, Password, StateID, Status } = req.body;

        if (!Name && !Email && !Password && !StateID && !Status) {
            res.status(400).send('Please provide atleast one required fields to update');
        } else {
            const data = {};
            if (Name) {
                data.name = Name;
            }
            if (Email) {
                data.email = Email;
            }
            if (Password) {
                data.password = Password;
            }
            if (StateID) {
                data.state_id = StateID;
            }
            if (Status) {
                data.status = Status == true ? '1' : '0';
            }
            req.userData = data;
            next();
        }
    } catch(error) {
        console.log('Error occured while validating input for update user: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.createVehicleRegistration = async (req, res, next) => {
    try {
        const { UserID, VehicleID, RegistrationDate, ExpiryDate } = req.body;
        if (!UserID || !VehicleID || !RegistrationDate || !ExpiryDate) {
            res.status(400).send('Please provide all required fields');
        } else {
            req.vehicleRegistrationData = {
                user_id: UserID,
                vehicle_id: VehicleID,
                registration_date: RegistrationDate + 'T00:00:00Z',
                expiry_date: ExpiryDate + 'T00:00:00Z'
            }
            next();
        }
    } catch(error) {
        console.log('Error occured while validating input for create user: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};

exports.updateVehicleRegistration = async (req, res, next) => {
    try {
        console.log(req.params.id);

        const { UserID, VehicleID, RegistrationDate, ExpiryDate } = req.body;

        if (!UserID && !VehicleID && !RegistrationDate && !ExpiryDate) {
            res.status(400).send('Please provide atleast one required fields to update');
        } else {
            const data = {};
            if (UserID) {
                data.user_id = UserID;
            }
            if (VehicleID) {
                data.vehicle_id = VehicleID;
            }
            if (RegistrationDate) {
                data.registration_date = RegistrationDate + 'T00:00:00Z';
            }
            if (ExpiryDate) {
                data.expiry_date = ExpiryDate + 'T00:00:00Z';
            }
            req.vehicleRegistrationData = data;
            next();
        }
    } catch(error) {
        console.log('Error occured while validating input for update user: ', error.message);
        res.status(500).send("Something went wrong!");
    }
};