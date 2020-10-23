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

let users = require("../db/users.json");

const User = {};

User.findAll = async ({ limit = 10, skip = 0 }) => {
  try {
    let usersArr = [];
    usersArr = users.slice(skip, limit + skip);

    return usersArr;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Find users based on name
// Match with firstname, lastname, and username
User.findAllByName = async (name, { skip = 0, limit = 10 }) => {
  try {
    let usersArr = [];
    let re = new RegExp(name, "i");

    let usersCount = 0;
    let skipCount = 0;

    for (let i = 0; i < users.length; i++) {
      if (
        (users[i].firstname && users[i].firstname.match(re)) ||
        (users[i].lastname && users[i].lastname.match(re)) ||
        (users[i].username && users[i].username.match(re))
      ) {
        if (skipCount++ < skip) {
          continue;
        }

        if (usersCount < limit) {
          usersArr.push(users[i]);
          usersCount++;
        } else {
          break;
        }
      }
    }

    return usersArr;
  } catch (error) {
    console.log(error);
    console.log("An error occured...");
    return [];
  }
};

// Find actors based on role::user, contributor
User.findAllRole = async (role, { limit = 10, skip = 0 }) => {
  try {
    let usersArr = [];

    let usersCount = 0;
    let skipCount = 0;

    for (let i = 0; i < users.length; i++) {
      if (users[i].role.toLowerCase() === role.toLowerCase()) {
        if (skipCount++ < skip) {
          continue;
        }

        if (usersCount < limit) {
          usersArr.push(users[i]);
          usersCount++;
        } else {
          break;
        }
      }
    }

    return usersArr;
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return [];
  }
};

// Find a user by id
User.findById = async (id) => {
  try {
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == id) return users[i];
    }

    return null;
  } catch (error) {
    console.log("An error occured...");
    console.log(error);
    return null;
  }
};

module.exports = User;