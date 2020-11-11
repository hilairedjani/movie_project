// == PEOPLE CONTROLLER

const Person = require("../models/person").default;
const people = require("../db/people.json");

/**
 * @description Fetch all people::First 10 people by default
 */
exports.getPeople = async (req, res) => {
  try {
    let skip = parseInt(req.query.skip) || 0;
    let limit = parseInt(req.query.limit) || 10;

    //   Return all people in db
    let peopleArr = [];

    if (req.query.name) {
      peopleArr = await Person.findAllByName(req.query.name, { skip, limit });
    } else if (req.query.rank) {
      peopleArr = await Person.findAllByRank(req.query.rank, { skip, limit });
    } else {
      peopleArr = await Person.findAll({ skip, limit });
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

    //   Return all people in db
    let actorsCount = 0;
    let skipCount = 0;
    const actorsArr = [];
    while (actorsCount < limit) {
      for (let i = 0; i < people.length; i++) {
        if (people[i].rank == "actor") {
          if (skipCount++ < skip) {
            continue;
          }

          actorsArr.push(people[i]);
          actorsCount++;
        }
      }
    }

    return res.json(actorsArr);
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

    for (let i = 0; i < people.length; i++) {
      if (
        people[i].firstname === firstname &&
        people[i].lastname === lastname &&
        people[i].rank === rank.toLowerCase()
      )
        return res.status(400).json({ message: "Person already exists" });
    }

    const person = await Person.createPerson({ firstname, lastname, rank });

    return res.json(person);
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return res.status(400).json(error);
  }
};
