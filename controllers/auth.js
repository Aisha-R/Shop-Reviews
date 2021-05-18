const User = require('../models/User.js');
const RefreshToken = require('../models/RefreshTokens.js');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    const { email, password } = req.body;
    
    try {

    const userFound = await User.query().select().where('email', email).limit(1);

    if ( userFound.length < 1) {
        return res.sendStatus(401);
    } else {
        
        const result = await bcrypt.compare(password, userFound[0].password);
        if (result) {
            
            const user = { email: email, id: userFound[0].ID };
            const accessToken = generateAccessToken(user);
            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
            
            await RefreshToken.query().insert({
                refreshToken: refreshToken
            });
            return res.status(200).json({accessToken: accessToken, refreshToken: refreshToken});
        } else {
            return res.sendStatus(401);
        }
    }
    } catch (error) {
        
        return res.sendStatus(400);
    }
};

exports.token = async (req, res) => {
    const refreshToken = req.body.token;
    if (refreshToken == null) {
        return res.sendStatus(401);
    }

    const existingToken = await RefreshToken.query().select().where('refreshToken', refreshToken);

    if (existingToken.length < 1) {
        return res.sendStatus(403);
    }
    
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(403);
        }

        const accessToken = generateAccessToken({email: user.email, id: user.id});
        return res.json({accessToken: accessToken})
    });
};

exports.logout = async (req, res) => {
    await RefreshToken.query().delete().where('refreshToken', req.body.token);
    
    return res.sendStatus(204);
};

const generateAccessToken = (user) => {
    // for testing purposes i changed the expiration time
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '120m'});
}