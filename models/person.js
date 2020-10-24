// == PERSON MODEL

/**
 * == PERSON SCHEMA
 * firstname
 * lastname
 * rank
 */

let people = require("../db/people.json");

const Person = {};

Person.findAll = async ({ limit = 10, skip = 0 }) => {
  try {
    let peopleArr = [];
    peopleArr = people.slice(skip, limit + skip);

    return peopleArr;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Find actors based on name
// Match with firstname and lastname
Person.findAllByName = async (name, { skip = 0, limit = 10 }) => {
  try {
    let peopleArr = [];
    let re = new RegExp(name, "i");

    let peopleCount = 0;
    let skipCount = 0;

    for (let i = 0; i < people.length; i++) {
      if (
        (people[i].firstname && people[i].firstname.match(re)) ||
        (people[i].lastname && people[i].lastname.match(re))
      ) {
        if (skipCount++ < skip) {
          continue;
        }

        if (peopleCount < limit) {
          peopleArr.push(people[i]);
          peopleCount++;
        } else {
          break;
        }
      }
    }

    return peopleArr;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Find actors based on rank::director, actor, writer
Person.findAllByRank = async (rank, { limit = 10, skip = 0 }) => {
  try {
    let peopleArr = [];

    let peopleCount = 0;
    let skipCount = 0;

    for (let i = 0; i < people.length; i++) {
      if (people[i].rank.toLowerCase() === rank.toLowerCase()) {
        if (skipCount++ < skip) {
          continue;
        }

        if (peopleCount < limit) {
          peopleArr.push(people[i]);
          peopleCount++;
        } else {
          break;
        }
      }
    }

    return peopleArr;
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return [];
  }
};

// Find a person by id
Person.findById = async (id) => {
  try {
    for (let i = 0; i < people.length; i++) {
      if (people[i].id == id) return people[i];
    }

    return null;
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return null;
  }
};

Person.createPerson = async (params) => {
  try {
    let newId = people[people.length - 1].id;

    people.push({
      id: newId ? ++newId : 1,
      firstname: params.firstname,
      lastname: params.lastname,
      rank: params.rank,
    });

    return people[people.length - 1];
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return null;
  }
};

module.exports = Person;
