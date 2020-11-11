// == PERSON MODEL

/**
 * == PERSON SCHEMA
 * firstname
 * lastname
 * rank
 */

import { Schema, model } from "mongoose";

const personSchema = new Schema({
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
});

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

  // Find a person by id
  findById: async function (id) {
    return await this.findById(id);
  },

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

export default model("Person", personSchema);
