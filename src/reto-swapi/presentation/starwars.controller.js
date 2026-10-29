const {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Inject,
  Param,
  Post,
} = require('@nestjs/common');
const { FilmService } = require('../application/service/film.service');

class StarwarsController {
  constructor(filmService) {
    this.filmService = filmService;
  }

  getListFilms(headers) {
    return this.filmService.getListFilms(headers);
  }

  addMongoFilm(requestBody) {
    return this.filmService.createFilm(requestBody);
  }

  getFilmById(id) {
    return this.filmService.getFilmById(Number(id));
  }
}

const controller = StarwarsController.prototype;
Controller('starwars')(StarwarsController);
Inject(FilmService)(StarwarsController, undefined, 0);
Get('mongo/films')(
  controller,
  'getListFilms',
  Object.getOwnPropertyDescriptor(controller, 'getListFilms'),
);
HttpCode(200)(
  controller,
  'getListFilms',
  Object.getOwnPropertyDescriptor(controller, 'getListFilms'),
);
Headers()(controller, 'getListFilms', 0);
Post('mongo/films')(
  controller,
  'addMongoFilm',
  Object.getOwnPropertyDescriptor(controller, 'addMongoFilm'),
);
HttpCode(201)(
  controller,
  'addMongoFilm',
  Object.getOwnPropertyDescriptor(controller, 'addMongoFilm'),
);
Body()(controller, 'addMongoFilm', 0);
Get('mongo/films/:id')(
  controller,
  'getFilmById',
  Object.getOwnPropertyDescriptor(controller, 'getFilmById'),
);
HttpCode(200)(
  controller,
  'getFilmById',
  Object.getOwnPropertyDescriptor(controller, 'getFilmById'),
);
Param('id')(controller, 'getFilmById', 0);

module.exports = { StarwarsController };
