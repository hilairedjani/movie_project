// == USER MODEL

/**
 * == USER SCHEMA
 * firstname
 * lastname
 * email
 * password
 * username
 * role
 */

import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already in use"],
      trim: true,
      validate: [validator.isEmail, "Email is invalid"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      minlength: [2, "Username must be between 2 to 30 characters"],
      maxlength: [30, "Username must be between 2 to 30 characters"],
      validate: [
        /^\w+$/,
        "Username can only contain letters, numbers and/or underscore",
      ],
      unique: [true, "USername already in use"],
      trim: true,
    },
    firstname: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Static methods
userSchema.statics = {
  // Find all users
  findAll: async function ({ limit = 10, skip = 0 }) {
    return await this.find().limit(parseInt(limit)).skip(parseInt(skip));
  },

  // Find users based on name
  // Match with firstname, lastname, and username
  findAllByName: async function (name, { skip = 0, limit = 10 }) {
    let nameRegex = new RegExp("^" + name);
    return await this.find({
      $or: [
        {
          firstname: {
            $regex: nameRegex,
            $options: "i",
          },
        },
        {
          lastname: {
            $regex: nameRegex,
            $options: "i",
          },
        },
        {
          username: {
            $regex: nameRegex,
            $options: "i",
          },
        },
      ],
    })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find users based on role::user, contributor
  findAllByRole: async function (role, { limit = 10, skip = 0 }) {
    return this.find({
      role: role.toLowerCase(),
    })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find a user by id
  findById: async function (id) {
    return await this.findById(id);
  },

  // Find a user by email
  findByEmail: async function (email) {
    return await this.findOne({ email });
  },

  // Find a user by username
  findByUsername: async function (username) {
    return await this.findOne({ username });
  },

  // Find a user by username or email
  findByUsernameOrEmail: async function (ue) {
    return await this.findOne({ $or: [{ username: ue }, { email: ue }] });
  },

  createUser: async function ({
    firstname,
    lastname,
    email,
    username,
    password,
    role,
  }) {
    const user = await new this({
      firstname,
      lastname,
      email,
      password,
      username,
      role,
    });

    await user.save();

    return user;
  },
};

export default model("Person", personSchema);
