const User = require("../models/User.js");

const applyListOptions = require("../utils/apply-list-options");

const getAll = async listOptions => {
  const SEARCH_FIELDS = ["firstName", "lastName", "email"];
  let query = User.query().select();
  query = applyListOptions(SEARCH_FIELDS, query, listOptions);
  return query;
};

const getOne = async id => {
  return User.query().findById(id);
};

const create = async user => {
  return User.query().insert(user);
};

const delete_ = async id => {
  await User.query().deleteById(id);
};

module.exports = {
  getAll,
  getOne,
  create,
  delete_
};
