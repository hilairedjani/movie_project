// == CONTRIBUTION MODEL

/**
 * == CONTRIBUTION SCHEMA
 * type
 * item
 */

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const contributionSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Contribution must have a user"],
    },
    type: {
      type: String,
      required: [true, "Type is required"],
      enum: ["Movie", "Person"],
    },
    _item: {
      type: Schema.Types.ObjectId,
      refPath: "type",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Instance methods
contributionSchema.methods = {};

// Static methods
contributionSchema.statics = {
  // Create a new contribution
  createContribution: async function ({ _user, type, _item }) {
    let contribution = await this.findOne({ _user, type, _item });

    if (contribution) return contribution;

    contribution = await new this({
      _user,
      type,
      _item,
    });

    await contribution.save();

    return contribution;
  },

  //   Fetch contributions for a given user
  findForUser: async function (_user, { limit = 10, skip = 0 }) {
    return await this.find({ _user }).limit(limit).skip(skip);
  },
};

module.exports = model("Contribution", contributionSchema);
