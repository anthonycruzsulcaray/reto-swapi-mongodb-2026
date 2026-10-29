const { Module } = require('@nestjs/common');
const { ConfigModule } = require('@nestjs/config');
const { MongooseModule } = require('@nestjs/mongoose');
const configuration = require('./app.properties');
const {
  FilmService,
} = require('./reto-swapi/application/service/film.service');
const {
  FILM_REPOSITORY,
} = require('./reto-swapi/domain/repository/film.repository');
const {
  MongoModule,
} = require('./reto-swapi/infrastructure/module/mongo.module');
const {
  MysqlModule,
} = require('./reto-swapi/infrastructure/module/mysql.module');
const {
  HybridFilmRepository,
} = require('./reto-swapi/infrastructure/repository/film.repository');
const {
  StarwarsController,
} = require('./reto-swapi/presentation/starwars.controller');

class AppModule {}

Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    MongooseModule.forRoot(
      process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/starwars',
      {
        minPoolSize: 1,
        maxPoolSize: 2,
        maxIdleTimeMS: 5 * 60 * 1000,
        dbName: process.env.MONGO_DB || 'starwars',
        autoIndex: false,
      },
    ),
    MongoModule,
    MysqlModule,
  ],
  controllers: [StarwarsController],
  providers: [
    FilmService,
    { provide: FILM_REPOSITORY, useClass: HybridFilmRepository },
  ],
})(AppModule);

module.exports = { AppModule };
