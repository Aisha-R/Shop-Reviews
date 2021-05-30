const User = require("../models/User.js");

const applyListOptions = require("../utils/apply-list-options");

const getAll = async listOptions => {
  const SEARCH_FIELDS = ["firstName", "lastName", "email"];
  let query = User.find({});
  query = applyListOptions(SEARCH_FIELDS, query, listOptions);
  return query;
};

const getOne = async id => {
  return User.findById(id);
};

const create = async user => {
  return User.create(user);
};

const delete_ = async id => {
  await User.findByIdAndDelete(id);
};

module.exports = {
  getAll,
  getOne,
  create,
  delete_
};
