const Review = require("../models/Review.js");

const applyListOptions = require("../utils/apply-list-options");

const getAll = async listOptions => {
  const SEARCH_FIELDS = ["reviewText"];
  let query = Review.query().select();
  query = applyListOptions(SEARCH_FIELDS, query, listOptions);
  return query;
};

const getOne = async id => {
  return Review.query().findById(id);
};

const create = async (review, userId) => {
  return await Review.query().insert({ ...review, UserID: userId });
};

const update = async (id, review) => {
  await Review.query()
    .findById(id)
    .patch(review);

  return getOne(id);
};

const delete_ = async id => {
  await Review.query().deleteById(id);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  delete_
};
