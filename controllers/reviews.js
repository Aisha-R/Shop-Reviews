const Review = require('../models/Review.js');
const User = require('../models/User.js');

exports.readAllReviews = async (req, res) => {
    try {
        const reviews = await Review.query().select();

        return res.send({response: reviews});

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.readReviewsByBusiness = async (req, res) => {
    const { id } = req.body;
    
    try {
        const reviews = await Review.query().select().where('BusinessID', id);

        return res.send({response: reviews});

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.readReviewsByStars = async (req, res) => {
    const { stars } = req.body;
    
    try {
        const reviews = await Review.query().select().where('stars', stars);

        return res.send({response: reviews});

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.readReviewsByUser = async (req, res) => {
    const { id } = req.body;
    
    try {
        const reviews = await Review.query().select().where('UserID', id);

        return res.send({response: reviews});

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.readReviewsByLanguage = async (req, res) => {
    const { id } = req.body;
    
    try {
        const reviews = await Review.query().select().where('LanguageID', id);

        return res.send({response: reviews});

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.createReview = async (req, res) => {
    const { reviewText, stars, reviewDate, likeCount, BusinessID, LanguageID } = req.body;
    console.log(req.body);
    console.log(req.user.id);
    try {
        console.log('!')
        await Review.query().insert({
            reviewText, 
            stars, 
            reviewDate, 
            likeCount, 
            UserID: req.user.id, 
            BusinessID, 
            LanguageID
        });
        console.log('Helo')
        return res.sendStatus(200);

    } catch (error) {
        console.log('Here');
        return res.sendStatus(500);
    }
};

exports.deleteReview = async (req, res) => {

    const id = req.body.id;
    
    try {

        const review = await Review.query().findById(id);
        
        if (review.UserID == req.user.id) {
            
            await Review.query().deleteById(id);

            return res.sendStatus(200);
        } else {
            
            return res.sendStatus(401);
        }

    } catch (error) {
        
        return res.sendStatus(500);
    }

};

exports.updateTextInReview = async (req, res) => {

    const { id, reviewText } = req.body;
    console.log(req.body);

    try {

        const review = await Review.query().findById(id);
        
        if (review.UserID == req.user.id) {
            
            await Review.query().findById(id).patch({reviewText});

            return res.sendStatus(200);
        } else {
            
            return res.sendStatus(401);
        }

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.updateStarsInReview = async (req, res) => {

    const { id, stars } = req.body;

    try {

        const review = await Review.query().findById(id);
        
        if (review.UserID == req.user.id) {
            
            await Review.query().findById(id).patch({stars});

            return res.sendStatus(200);
        } else {
            
            return res.sendStatus(401);
        }

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.updateLikeInReview = async (req, res) => {

    const id = req.body.id;

    try {
        
        const user = await User.query().findById(req.user.id).limit(1);
        
        await User.query().findById(req.user.id).patch({ numberOfLikes: user.numberOfLikes + 1 });

        const review = await Review.query().findById(id);

        await Review.query().findById(id).patch({ likeCount: review.likeCount + 1 });

        return res.sendStatus(200);

    } catch (error) {
        
        return res.sendStatus(500);
    }
};