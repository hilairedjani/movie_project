// == PERSON CONNECTION MODEL

/**
 * == PERSON CONNECTION SCHEMA
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
  createConnection: async function (_user, _person) {
    const connection = await new this({
      _user,
      _person,
    });

    await connection.save();

    return connection;
  },

  // Delete a given connection
  deleteConnection: async function ({ _id, _user, _person }, options) {
    if (_id) return this.findByIdAndDelete(_id);
    if (_user && _person) return this.findOneAndDelete({ _user, _person });
    return null;
  },
};

module.exports = model("PersonConnection", personConnectionSchema);
