const Business = require('../models/Business.js');
const BusinessDetails = require('../models/BusinessDetails.js');
const WorkingHours = require('../models/WorkingHours.js');

exports.readAllBusinesses = async (req, res) => {
    
    try {
        const businesses = await Business.query().select();

        return res.send({response: businesses});

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.readBusiness = async (req, res) => {
    const id = req.params.id;
    console.log(id)
    
    try {
        const business = await Business.query().findById(id);

        const detail = await BusinessDetails.query().findById(business.detailsID);
        
        const workingHours = await WorkingHours.query().where('BusinessID', business.ID);

        return res.send({response: business, detail, workingHours});

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.createBusiness = async (req, res) => {
    const { title, description, category, address, city, country, postCode, phoneNumber, webSite, email, 
    acceptsCreditCard, acceptsReservations, delivers, offersTakeout, freeWifi, outDoorSeating, driveThrough, priceRange } = req.body;

    const businessInfo = {
        title,
        description,
        category,
        address,
        city,
        country,
        postCode,
        phoneNumber,
        webSite,
        email,
        detailsID: null,
        userID: req.user.id,
    };

    const detailsInfo = {
        acceptsCreditCard,
        acceptsReservations,
        delivers,
        offersTakeout,
        freeWifi,
        outDoorSeating,
        driveThrough,
        priceRange,
    }    

    const trx = await Business.startTransaction();

    try {

        const exists = await Business.query().select().where('title', title).limit(1);

        if (exists.length > 0) {
            return res.send({response: "Business already exists."});
        }
        
        await insertBusinessAndDetails(businessInfo, detailsInfo, trx);
        await trx.commit();

        return res.sendStatus(200);

    } catch (err) {

        await trx.rollback();
        
        return res.sendStatus(500);
    }

};

exports.deleteBusiness = async (req, res) => {

    const id = req.body.id;
    console.log(id)

    try {

        const business = await Business.query().findById(id);
        
        if (business.userID == req.user.id) {

            const detail = await BusinessDetails.query().findById(business.detailsID);

            await Business.query().deleteById(id);

            await BusinessDetails.query().deleteById(detail.ID);

            return res.sendStatus(200);
        } else {
            
            return res.sendStatus(401);
        }

    } catch (error) {
        
        return res.sendStatus(500);
    }

};

exports.updateTitleInBusiness = async (req, res) => {

    const { id, title } = req.body;

    try {

        const business = await Business.query().findById(id);
        
        if (business.userID == req.user.id) {

            await Business.query().findById(id).patch({title});

            return res.sendStatus(200);
        } else {
            
            return res.sendStatus(401);
        }

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.updateDescriptionInBusiness = async (req, res) => {

    const { id, description } = req.body;

    try {

        const business = await Business.query().findById(id);
        
        if (business.userID == req.user.id) {

            await Business.query().findById(id).patch({description});

            return res.sendStatus(200);
        } else {
            
            return res.sendStatus(401);
        }

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.updateEmailInBusiness = async (req, res) => {

    const { id, email } = req.body;

    try {

        const business = await Business.query().findById(id);
        
        if (business.userID == req.user.id) {

            await Business.query().findById(id).patch({email});

            return res.sendStatus(200);
        } else {
            
            return res.sendStatus(401);
        }

    } catch (error) {
        
        return res.sendStatus(500);
    }
};

exports.updatePhoneNumberInBusiness = async (req, res) => {

    const { id, phoneNumber } = req.body;

    try {
        const business = await Business.query().findById(id);
        
        if (business.userID == req.user.id) {

            await Business.query().findById(id).patch({phoneNumber});

            return res.sendStatus(200);
        } else {
            
            return res.sendStatus(401);
        }

    } catch (error) {
    
        return res.sendStatus(500);
    }
};

exports.updateWebsiteInBusiness = async (req, res) => {

    const { id, webSite } = req.body;

    try {

        const business = await Business.query().findById(id);
        
        if (business.userID == req.user.id) {

            await Business.query().findById(id).patch({webSite});

            return res.sendStatus(200);
        } else {
            
            return res.sendStatus(401);
        }

    } catch (error) {
    
        return res.sendStatus(500);
    }
};

async function insertBusinessAndDetails(businessInfo, detailsInfo, db) {
    const businessDetails = await BusinessDetails.query(db).insert(detailsInfo);
    businessInfo.detailsID = businessDetails.id;
    return businessDetails.$relatedQuery('business', db).insert(businessInfo);
}