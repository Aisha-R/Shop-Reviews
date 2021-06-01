module.exports = (req, res, next) => {
  const listParams = req.query;
  if (req.query.range) {
    listParams.range = JSON.parse(req.query.range);
  }
  if (req.query.sort) {
    listParams.sort = JSON.parse(req.query.sort);
  }
  if (req.query.filter) {
    listParams.filter = JSON.parse(req.query.filter);
  }
  if (req.query.search) {
    listParams.search = req.query.search;
  }
  req.queryListParams = listParams;
  next();
};
