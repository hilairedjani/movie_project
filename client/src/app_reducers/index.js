import { combineReducers } from "redux";

import { default as auth } from "./auth";
import { default as movies } from "./movies";
import { default as users } from "./users";
import { default as contributions } from "./contributions";
import { default as people } from "./people";
import { default as usersConnections } from "./usersConnections";
import { default as peopleConnections } from "./peopleConnections";
import { default as reviews } from "./reviews";
import { default as sockets } from "./sockets";

export default combineReducers({
  auth,
  movies,
  users,
  contributions,
  people,
  usersConnections,
  peopleConnections,
  reviews,
  sockets,
});
