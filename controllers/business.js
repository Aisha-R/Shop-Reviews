const BusinessService = require("../services/business");

exports.getAll = async (req, res) => {
  const listOptions = req.queryListParams;
  try {
    const businesses = await BusinessService.getAll(listOptions);
    return res.send({ response: businesses });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const businessWithDetails = await BusinessService.getOne(id);
    return res.send({ response: businessWithDetails });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.create = async (req, res) => {
  const newBusiness = req.body;
  try {
    const createdBusiness = await BusinessService.create(newBusiness);
    return res.send({ response: createdBusiness });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

exports.deleteBusiness = async (req, res) => {
  const id = req.params.id;

  try {
    await BusinessService.delete_(id);
    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const business = req.body;
  try {
    const updatedBusiness = await BusinessService.update(id, business);
    res.send({ response: updatedBusiness });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
