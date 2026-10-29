const { Injectable } = require('@nestjs/common');
const { InjectModel } = require('@nestjs/mongoose');
const { EntityRepository } = require('../document/entity.document');
const { FILM_MODEL } = require('../schemas/film.schema');

class FilmQueryMongoDB extends EntityRepository {
  constructor(filmModel) {
    super(filmModel);
  }

  getCountTotalFilms() {
    return this.entityModel.countDocuments().exec();
  }

  getListFilmsByPaged(page, size) {
    const skip = (page - 1) * size;
    return this.entityModel.find().skip(skip).limit(size).exec();
  }

  addNewFilm(film) {
    return this.create(film);
  }
}

InjectModel(FILM_MODEL)(FilmQueryMongoDB, undefined, 0);
Injectable()(FilmQueryMongoDB);

module.exports = { FilmQueryMongoDB };
