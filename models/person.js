// == PERSON MODEL

/**
 * == PERSON SCHEMA
 * firstname
 * lastname
 * rank
 */

const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const personSchema = new Schema(
  {
    rank: {
      type: String,
      enum: ["director", "actor", "writer"],
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Static methods
personSchema.statics = {
  // Find all people
  findAll: async function ({ limit = 10, skip = 0 }) {
    return await this.find().limit(parseInt(limit)).skip(parseInt(skip));
  },

  // Find people based on name
  // Match with firstname and lastname
  findAllByName: async function (name, { skip = 0, limit = 10 }) {
    const nameRegex = new RegExp("^" + name);

    return await this.find({
      $or: [
        {
          firstname: {
            $regex: nameRegex,
            $options: "i",
          },
        },
        { lastname: { $regex: nameRegex, $options: "i" } },
      ],
    })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find people based on rank::director, actor, writer
  findAllByRank: async function (rank, { limit = 10, skip = 0 }) {
    return await this.find({
      rank: rank.toLowerCase(),
    })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find people based on name and rank::director, actor, writer
  findAllByNameAndRank: async function (name, rank, { limit = 10, skip = 0 }) {
    const nameRegex = new RegExp("^" + name);
    return await this.find({
      $and: [
        { rank },
        {
          $or: [
            {
              firstname: {
                $regex: nameRegex,
                $options: "i",
              },
            },
            { lastname: { $regex: nameRegex, $options: "i" } },
          ],
        },
      ],
    })
      .limit(parseInt(limit))
      .skip(parseInt(skip));
  },

  // Find a person by name
  findByName: async function ({ firstname = "", lastname = "", ...params }) {
    if (lastname.length > 0 && firstname.length > 0)
      return await this.findOne({ $or: [{ firstname }, { lastname }] });

    if (firstname.length > 0) return await this.findOne({ firstname });

    return await this.findOne({ lastname });
  },

  // Find a person by name and rank
  findByNameAndRank: async function ({ firstname = "", lastname = "", rank }) {
    if (lastname.length > 0 && firstname.length > 0)
      return await this.findOne({
        firstname,
        lastname,
        rank: rank.toLowerCase(),
      });

    if (firstname.length > 0)
      return await this.findOne({ rank: rank.toLowerCase(), firstname });

    return await this.findOne({ rank: rank.toLowerCase(), lastname });
  },

  // Create a new person
  createPerson: async function ({ firstname, lastname, rank }) {
    const person = await new this({
      firstname,
      lastname,
      rank,
    });

    await person.save();

    return person;
  },
};

module.exports = model("Person", personSchema);
