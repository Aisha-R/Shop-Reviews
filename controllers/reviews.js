const Review = require("../models/Review.js");
const ReviewsService = require("../services/reviews");

exports.getAll = async (req, res) => {
  const listOptions = req.queryListParams;
  try {
    const reviews = await ReviewsService.getAll(listOptions);
    return res.send({ response: reviews });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.getOne = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await ReviewsService.getOne(id);
    return res.send({ response: review });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.create = async (req, res) => {
  const review = req.body;
  try {
    const createdReview = await ReviewsService.create(review, req.user.id);
    return res.status(201).send({ response: createdReview });
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.deleteReview = async (req, res) => {
  const id = req.params.id;
  try {
    const review = await Review.findById(id);

    if (review.UserID === req.user.id) {
      await ReviewsService.delete_(id);
      return res.sendStatus(204);
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;
  const reviewUpdate = req.body;
  try {
    const review = await Review.findById(id);

    if (review.UserID === req.user.id) {
      const updatedReview = await ReviewsService.update(id, reviewUpdate);
      res.send({ response: updatedReview });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
};
