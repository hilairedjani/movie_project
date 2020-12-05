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
      ref: "User",
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
  follow: async function ({ _follower, _following }) {
    const connection = await new this({
      _follower,
      _following,
    });

    await connection.save();

    await connection
      .populate([
        {
          path: "_follower",
        },
        {
          path: "_following",
        },
      ])
      .execPopulate();

    return connection;
  },

  // Delete a given connection
  unfollow: async function ({ _id, _follower, _following }, options) {
    let connection;
    if (_id) connection = await this.findByIdAndDelete(_id);
    else if (_follower && _following)
      connection = await this.findOneAndDelete({ _follower, _following });

    if (connection) {
      await connection
        .populate([
          {
            path: "_follower",
          },
          {
            path: "_following",
          },
        ])
        .execPopulate();
    }

    return connection;
  },
};

module.exports = model("UserConnnection", userConnectionSchema);
