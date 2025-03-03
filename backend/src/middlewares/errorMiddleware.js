const handle400Error = (req, res, message, responseObject) => {
    res.status(400).json({ status_code: '400', error: 'Error', message: `${message}`, response: responseObject });

};

const handle404Error = (req, res, message) => {
    res.status(404).json({ status_code: '404', error: 'Not Found', message: `${message}` });
    
};
const handle500Error = (req, res, message) => {
    res.status(500).json({ status_code: '500', error: 'Internal Server Error', message: `${message}` });
    
};

const handle401Error = (req, res, message) => {
    res.status(401).json({ status_code: '404', error: 'Incorret Password', message: `${message}` });
    
};

module.exports = { handle404Error, handle500Error, handle400Error, handle401Error };