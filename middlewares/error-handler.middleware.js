exports.errorHandler = async (err, req, res, next) => {
    res.status(err.status || 500).send({
        Error: {
            "Error Status": err.status || 500,
            Message: err.message
        }
    });
};