const handle200 = (req, res, message, responseObject) => {
    res.status(200).json({ status_code: '200', message: `${message}`, response: responseObject});
};

const handle201 = (req, res, message, responseObject) => {
    res.status(201).json({ status_code: '201', message: `${message}`, response: responseObject});
};

const handle206 = (req, res, message, responseObject) => {
    res.status(206).json({ status_code: '206', message: `${message}`, response: responseObject});
};
module.exports = {handle200, handle201, handle206};