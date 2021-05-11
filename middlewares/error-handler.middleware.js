exports.errorHandler = async (err, req, res, next) => {
    res.status(err.status || 500).send({
        Error: {
            ErrorStatus: err.status || 500,
            Message: err.message
        }
    });
};