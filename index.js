require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const { initializeDatabase } = require("./db/db.connection");
const { Movies1 } = require("./models/movies1.model");

app.use(express.json());

initializeDatabase();

app.get("/", (req, res) => {
  res.send("Hello, Express!");
});

app.get("/movies1", async (req, res) => {
  try {
    const allmovies = await Movies1.find();
    res.json(allmovies);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/movies1", async (req, res) => {
  const { movieTitle, director, genre } = req.body;

  try {
    const movieData = new Movies1({ movieTitle, director, genre });
    await movieData.save();
    res.status(201).json(movieData);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/movies1/:id", async (req, res) => {
  const movieId = req.params.id;

  try {
    const deletedMovie = await Movies1.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({ error: "Movie not found" });
    }

    res.status(200).json({
      message: "Movie deleted successfully",
      book: deletedBook,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// to update a movie detail
app.put("/movies1/:id", async (req, res) => {
  const movieId = req.params.id;
  const updatedMovieData = req.body;

  try {
    const updatedMovie = await Movies1.findByIdAndUpdate(
      movieId,
      updatedMovieData,
      { new: true }
    );
    if (!updatedMovie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
