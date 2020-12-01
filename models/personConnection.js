// == PERSON CONNECTION MODEL

/**
 * == PERSON CONNECTION SCHEMA
 * type
 * item
 */

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const personConnectionSchema = new Schema(
  {
    _user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    _person: {
      type: Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Instance methods
personConnectionSchema.methods = {};

// Static methods
personConnectionSchema.statics = {
  // Create a new connection
  createConnection: async function ({ _user, _person }) {
    const contribution = await new this({
      _user,
      _person,
    });

    await contribution.save();

    return contribution;
  },
};

module.exports = model("PersonConnnection", personConnectionSchema);
