const Business = require("../models/Business.js");
const BusinessDetails = require("../models/BusinessDetails");
const WorkingHours = require("../models/WorkingHours");

const applyListOptions = require("../utils/apply-list-options");

const getAll = async listOptions => {
  const SEARCH_FIELDS = ["title", "description", "category", "address"];
  let query = Business.find({});
  query = applyListOptions(SEARCH_FIELDS, query, listOptions);
  return query;
};

const getOne = async id => {
  return Business.query()
    .withGraphFetched("[details, workingHours]")
    .findById(id);
};

const create = async ({ details, workingHours, ...business }) => {
  const trx = await Business.startTransaction();
  try {
    const newBusinessDetails = await BusinessDetails.query(trx).insert(details);
    const newBusiness = await Business.query(trx).insert({
      ...business,
      detailsID: newBusinessDetails.ID
    });
    await Promise.all(
      workingHours.map(wh =>
        WorkingHours.query(trx).insert({ ...wh, BusinessID: newBusiness.ID })
      )
    );

    await trx.commit();

    return getOne(newBusiness.ID);
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

const update = async (id, { details, workingHours, ...business }) => {
  const trx = await Business.startTransaction();
  try {
    if (details) {
      await BusinessDetails.query(trx)
        .patch(details)
        .where("ID", details.ID);
    }
    if (workingHours && workingHours.length) {
      await Promise.all(
        workingHours.map(wh =>
          WorkingHours.query(trx)
            .patch(wh)
            .where("ID", wh.ID)
        )
      );
    }
    if (business) {
      await Business.query(trx)
        .patch(business)
        .where("ID", id);
    }

    await trx.commit();
    return getOne(id);
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

const delete_ = async id => {
  const trx = await Business.startTransaction();
  try {
    await WorkingHours.query(trx)
      .delete()
      .where("BusinessID", id);
    await Business.query(trx).deleteById(id);
    await Business.relatedQuery("details", trx)
      .for(id)
      .delete();
    await trx.commit();
  } catch (err) {
    await trx.rollback();
    throw err;
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  delete_
};
