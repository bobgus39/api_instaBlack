const jwt = require('jsonwebtoken');

const { invalidCredentialsError } = require('../services/errorService');

const authUserOptional = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (authorization) {
            let tokenInfo;
            try {
                tokenInfo = jwt.verify(authorization, process.env.SECRET);
            } catch (err) {
                invalidCredentialsError();
            }

            req.user = tokenInfo;
        } else {
        }
        next();
    } catch (err) {
        next(err);
    }
};

module.exports = authUserOptional;
