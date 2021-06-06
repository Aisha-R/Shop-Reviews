const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
     
    const token = req.cookies.jwt;
    
    if (token == null) {
        return res.sendStatus(401);
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
        if (error) {
            console.log('!!!')
            return res.sendStatus(403);
        }

        req.user = user;
        next();
    });
};

module.exports = {
    checkAuth: checkAuth
}

