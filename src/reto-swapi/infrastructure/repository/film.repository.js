const { Inject, Injectable } = require('@nestjs/common');
const {
  CreateFilmSchema,
  PageFilterSchema,
} = require('../validation/film.validation');
const {
  JoiValidationPipe,
} = require('../utils/validation/joi-validation.pipe');

function toFilmResponse(film) {
  return {
    id: film.id,
    episode_id: film.episode_id,
    title: film.title,
    opening_crawl: film.opening_crawl,
    director: film.director,
    producer: film.producer,
    release_date: film.release_date,
    characters: film.characters,
    planets: film.planets,
    starships: film.starships,
    vehicles: film.vehicles,
    species: film.species,
    created: film.created,
    edited: film.edited,
    url: film.url,
  };
}

class HybridFilmRepository {
  constructor(filmMongoDB, filmMysql) {
    this.filmMongoDB = filmMongoDB;
    this.filmMysql = filmMysql;
  }

  async getListFilms(headers) {
    const pagination = new JoiValidationPipe(PageFilterSchema).transform({
      page: headers.page ?? 1,
      size: headers.size ?? 10,
    });
    const { page, size } = pagination;
    const count = await this.filmMongoDB.getCountTotalFilms();
    const films = await this.filmMongoDB.getListFilmsByPaged(page, size);

    return {
      count,
      pages: Math.ceil(count / size),
      results: films.map(toFilmResponse),
    };
  }

  async getFilmById(filmId) {
    const film = await this.filmMongoDB.findOne({ id: filmId });
    return film ? toFilmResponse(film) : null;
  }

  async createFilm(requestBody) {
    const film = new JoiValidationPipe(CreateFilmSchema).transform(requestBody);
    const transaction = (await this.filmMysql.init()).transaction();
    const relationTables = [
      ['starwars_db.character', film.characters],
      ['planet', film.planets],
      ['starship', film.starships],
      ['vehicle', film.vehicles],
      ['specie', film.species],
    ];

    this.filmMysql.addFilm(film, transaction);
    for (const [table, values] of relationTables) {
      for (const value of values) {
        this.filmMysql.addRelation(table, value, transaction);
      }
    }

    const results = await transaction.commit();
    film.id = results[0].insertId;
    await this.filmMongoDB.addNewFilm(film);
    return film;
  }
}

Inject('FilmQueryMongoDB')(HybridFilmRepository, undefined, 0);
Inject('FilmQueryMysql')(HybridFilmRepository, undefined, 1);
Injectable()(HybridFilmRepository);

module.exports = { HybridFilmRepository };
