const mongoose = require("mongoose");

const movies1Schema = new mongoose.Schema({
  movieTitle: String,
  director: String,
  genre: String,
});

const Movies1 = mongoose.model("Movies1", movies1Schema);

module.exports = { Movies1 };
