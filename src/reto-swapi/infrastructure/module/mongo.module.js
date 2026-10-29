const { Module } = require('@nestjs/common');
const { MongooseModule } = require('@nestjs/mongoose');
const { FilmQueryMongoDB } = require('../persistence/mongodb/query/film.query');
const {
  FILM_MODEL,
  FilmSchema,
} = require('../persistence/mongodb/schemas/film.schema');

class MongoModule {}

Module({
  imports: [
    MongooseModule.forFeature([{ name: FILM_MODEL, schema: FilmSchema }]),
  ],
  providers: [{ provide: 'FilmQueryMongoDB', useClass: FilmQueryMongoDB }],
  exports: ['FilmQueryMongoDB'],
})(MongoModule);

module.exports = { MongoModule };
