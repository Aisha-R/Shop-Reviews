const Review = require("../models/Review.js");

const applyListOptions = require("../utils/apply-list-options");

const getAll = async listOptions => {
  const SEARCH_FIELDS = ["reviewText"];
  let query = Review.find({});
  query = applyListOptions(SEARCH_FIELDS, query, listOptions);
  return query;
};

const getOne = async id => {
  return Review.findById(id);
};

const create = async (review, userId) => {
  return await Review.create({ ...review, UserID: userId });
};

const update = async (id, review) => {
  await Review
    .findById(id)
    .patch(review);

  return getOne(id);
};

const delete_ = async id => {
  await Review.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  delete_
};
