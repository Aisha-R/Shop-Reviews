const User = require('../models/User.js');

const bcrypt = require('bcrypt');
const saltRounds = 12;

exports.createUser = async (req, res) => {
    const { firstName, lastName, profilePicture, password, email, country, city } = req.body;
    try {

        const existing = await User.query().select().where('email', email).limit(1);

        if (existing.length > 0) {
            return res.sendStatus(403);
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await User.query().insert({
            firstName, 
            lastName, 
            profilePicture,
            password: hashedPassword, 
            email, 
            country, 
            city
        });

        return res.sendStatus(200);

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.deleteUser = async (req, res) => {
    
    try {

        await User.query().deleteById(req.user.id);

        return res.sendStatus(200);

    } catch (error) {
        
        return res.sendStatus(500);
    }

};

exports.readAllUsers = async (req, res) => {
    try {
        const users = await User.query().select();

        return res.send({response: users});

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.readUser = async (req, res) => {
    
    try {

        const user = await User.query().findById(req.user.id);

        return res.send({response: user});

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.updateCityInUser = async (req, res) => {

    const { city } = req.body;

    try {

        await User.query().findById(req.user.id).patch({ city });

        return res.sendStatus(200);

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.updateCountryInUser = async (req, res) => {

    const { country } = req.body;

    try {

        await User.query().findById(req.user.id).patch({ country });

        return res.sendStatus(200);

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.updateProfilePictureInUser = async (req, res) => {

    const { profilePicture } = req.body;

    try {

        await User.query().findById(req.user.id).patch({ profilePicture });

        return res.sendStatus(200);

    } catch (error) {
        
        return res.sendStatus(500);
    }
};