import { combineReducers } from "redux";

import { default as auth } from "./auth";
import { default as movies } from "./movies";
import { default as users } from "./users";
import { default as contributions } from "./contributions";
import { default as people } from "./people";

export default combineReducers({
  auth,
  movies,
  users,
  contributions,
  people,
});
