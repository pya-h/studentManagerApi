const SendError = (error, res) => {
    const status = error.code || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message, data });
};

module.exports = SendError;