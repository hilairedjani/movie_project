// == USER CONNECTION MODEL

/**
 * == USER CONNECTION SCHEMA
 *
 */

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userConnectionSchema = new Schema(
  {
    _follower: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    _following: {
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
userConnectionSchema.methods = {};

// Static methods
userConnectionSchema.statics = {
  // Create a new connection
  createConnection: async function ({ _follower, _following }) {
    const contribution = await new this({
      _follower,
      _following,
    });

    await contribution.save();

    return contribution;
  },

  // Delete a given connection
  deleteConnection: async function ({ _id, _follower, _following }, {}) {
    if (_id) return this.findByIdAndDelete(_id);
    if (_follower && _following)
      return this.findOneAndDelete({ _follower, _following });
    return null;
  },
};

module.exports = model("UserConnnection", userConnectionSchema);
