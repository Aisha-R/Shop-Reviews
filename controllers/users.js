const User = require("../models/User.js");
const UserService = require("../services/users");

const bcrypt = require("bcrypt");
const saltRounds = 12;

exports.createUser = async (req, res) => {
  const {
    firstName,
    lastName,
    profilePicture,
    password,
    email,
    country,
    city
  } = req.body;
  try {
    const existing = await User
      .find()
      .where("email", email)
      .limit(1);
    if (existing.length > 0) {
      return res.sendStatus(403);
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    await UserService.create({
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
  const id = req.params.id;
  try {
    await UserService.delete_(id);
    return res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};

exports.getAll = async (req, res) => {
  const listOptions = req.queryListParams;
  try {
    const users = await UserService.getAll(listOptions);
    return res.send({ response: users });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserService.getOne(id);
    return res.send({ response: user });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getSelf = async (req, res) => {
  try {
    const user = await UserService.getOne(req.user.id);
    return res.send({ response: user });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.updateCityInUser = async (req, res) => {
  const { city } = req.body;

  try {
    await User
      .findById(req.user.id)
      .patch({ city });

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.updateCountryInUser = async (req, res) => {
  const { country } = req.body;

  try {
    await User
      .findById(req.user.id)
      .patch({ country });

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.updateProfilePictureInUser = async (req, res) => {
  const { profilePicture } = req.body;
  console.log(req.user.id);

  try {
    await User
       .findOneAndUpdate(req.user.id, { profilePicture }, { new: true }) 
     /* await User
      .findById(req.user.id)
      .patch({ profilePicture });  */

    return res.sendStatus(200); 
  } catch (error) {
    return res.sendStatus(500);
  }
};
