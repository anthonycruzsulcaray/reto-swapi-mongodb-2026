const mongoose = require('mongoose');

const FilmSchema = new mongoose.Schema(
  {
    id: Number,
    episode_id: Number,
    title: String,
    opening_crawl: String,
    director: String,
    producer: String,
    release_date: String,
    characters: [String],
    planets: [String],
    starships: [String],
    vehicles: [String],
    species: [String],
    created: String,
    edited: String,
    url: String,
  },
  { collection: 'films' },
);

module.exports = { FilmSchema, FILM_MODEL: 'FilmMongo' };
