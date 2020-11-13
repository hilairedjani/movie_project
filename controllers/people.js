// == PEOPLE CONTROLLER

const Person = require("../models/Person");

/**
 * @description Fetch all people::First 10 people by default
 */
exports.getPeople = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;

    //   Return all people in db
    let people = [];

    if (req.query.name) {
      people = await Person.findAllByName(req.query.name, { skip, limit });
    } else if (req.query.rank) {
      people = await Person.findAllByRank(req.query.rank, { skip, limit });
    } else {
      people = await Person.findAll({ skip, limit });
    }

    return res.json(peopleArr);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Fetch actors::First 10 by default
 */
exports.getActors = async (req, res) => {
  try {
    let skip = req.query.skip || 0;
    let limit = req.query.limit || 10;

    //   Return all actors in db
    const actors = await Person.findAllByRank("actor", { skip, limit });

    return res.json(actors);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Fetch directors::First 10 by default
 */
exports.getDirectors = async (req, res) => {
  try {
    let skip = req.query.skip || 0;
    let limit = req.query.limit || 10;

    //   Return all directors in db
    const actors = await Person.findAllByRank("director", { skip, limit });

    return res.json(actors);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Fetch writers::First 10 by default
 */
exports.getWriters = async (req, res) => {
  try {
    let skip = req.query.skip || 0;
    let limit = req.query.limit || 10;

    //   Return all writers in db
    const actors = await Person.findAllByRank("writer", { skip, limit });

    return res.json(actors);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Find a given person by id
 */
exports.getPerson = async (req, res) => {
  try {
    const personId = req.params.id;

    const person = await Person.findById(personId);

    if (!person) {
      return res.status(404).json({ message: "Person not found" });
    }

    return res.json(person);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};

/**
 * @description Add a person
 */
exports.createPerson = async (req, res) => {
  try {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const rank = req.body.rank;

    if (!firstname || firstname.length <= 0)
      return res.status(400).json({ message: "Firstname is required" });

    if (!lastname || lastname.length <= 0)
      return res.status(400).json({ message: "Lastname is required" });

    if (!rank || rank.length <= 0)
      return res.status(400).json({ message: "Rank is required" });

    // Check if person already exists
    let person = await Person.findByNameAndRank({
      firstname,
      lastname,
      rank: rank.toLowerCase(),
    });

    if (person)
      return res.status(400).json({ message: "Person already exists" });

    person = await Person.createPerson({ firstname, lastname, rank });

    return res.json(person);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
