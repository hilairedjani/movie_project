// == MOVIES CONTROLLER

/**
 * @description Fetch all movies
 */
exports.getMovies = async (req, res) => {
  try {
    console.log("== Query string");
    console.log(req.query);
    return res.json({
      message: "Working...",
    });
  } catch (error) {
    console.log("== SERVER ERROR");
    console.log(error);

    return res.status(500).send("An error occured...");
  }
};

/**
 * @description Fetch a given movie by id
 */
exports.getMovieById = async (res, res) => {
  try {
    const movieId = req.params.id;

    if (!movieId) {
      return res.status(404).json({ message: "No movie found" });
    }

    return res.json({ message: "Movie found..." });
  } catch (error) {}
};
