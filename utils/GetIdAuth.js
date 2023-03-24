const jwt = require('jsonwebtoken');

const GetIdAuth = (req) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, "SECRETKEY");

    const userId = decoded.id;

    return userId;
}

module.exports = { GetIdAuth };
