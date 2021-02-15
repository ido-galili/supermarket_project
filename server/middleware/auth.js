const jwt = require('jsonwebtoken');
const secret = 'thisismysecret@dsad12sd!@';

const withAuth = function(req, res, next) {
    const token =
        req.body.token ||
        req.session.token ||
        req.session.cookie.token;
    if (!token) {
        res.status(401).send('Unauthorized: No token provided');
    } else {
        jwt.verify(token, secret, function(err, decoded) {
            if (err) {
                res.status(401).send('Unauthorized: Invalid token');
            } else {
                req.email = decoded.email;
                next();
            }
        });
    }
};

module.exports = withAuth;
