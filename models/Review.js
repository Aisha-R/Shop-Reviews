const { Model } = require("objection");

class Review extends Model {
  static get tableName() {
    return "review";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["stars", "reviewDate", "UserID", "BusinessID"],
      properties: {
        id: { type: "integer" },
        reviewText: { type: "string", minLength: 1, maxLength: 2500 },
        stars: { type: "integer" },
        reviewDate: { type: "string", minLength: 1, maxLength: 50 },
        likeCount: { type: "integer" },
        UserID: { type: "integer" },
        BusinessID: { type: "integer" },
        LanguageID: { type: "integer" }
      }
    };
  }
}

module.exports = Review;
