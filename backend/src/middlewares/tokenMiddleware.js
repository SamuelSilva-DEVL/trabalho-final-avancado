// require('dotenv').config();
// const jwtSecret = process.env.JWT_SECRET;
// const jwt = require('jsonwebtoken');


// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ message: 'Token de acesso não fornecido' });
//     }
//     const jwtToken = token.replace('Bearer ', '');
//     jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Token de acesso inválido' });
//         }
//         req.user = decoded;
//         next();
//     });
// };

// const verifyAdminRoleToken = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         return res.status(401).json({ message: 'Access token not provided' });
//     }

//     const jwtToken = token.replace('Bearer ', '');
//     jwt.verify(jwtToken, jwtSecret, (err, decoded) => {
//         if (err) {
//             return res.status(401).json({ message: 'Invalid access token' });
//         }

//         if (decoded.role !== 0) {
//             return res.status(403).json({ message: 'Only users with role 0 can perform this action' });
//         }

//         req.user = decoded;
//         next();
//     });
// };


// module.exports = {verifyToken, verifyAdminRoleToken};