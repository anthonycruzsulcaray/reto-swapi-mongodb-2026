const { Inject, Injectable } = require('@nestjs/common');
const { FILM_REPOSITORY } = require('../../domain/repository/film.repository');

class FilmService {
  constructor(filmRepository) {
    this.filmRepository = filmRepository;
  }

  getListFilms(headers) {
    return this.filmRepository.getListFilms(headers);
  }

  getFilmById(id) {
    return this.filmRepository.getFilmById(id);
  }

  createFilm(film) {
    return this.filmRepository.createFilm(film);
  }
}

Inject(FILM_REPOSITORY)(FilmService, undefined, 0);
Injectable()(FilmService);

module.exports = { FilmService };
