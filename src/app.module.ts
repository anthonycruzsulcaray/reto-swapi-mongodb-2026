import { Module } from '@nestjs/common';
import { StarwarsController } from './reto-swapi/presentation/starwars.controller';
import { FilmService } from './reto-swapi/application/service/film.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmModule } from './reto-swapi/infrastructure/module/film.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot('mongodb://localhost/27017', {
      minPoolSize: 1,
      maxPoolSize: 2,
      maxIdleTimeMS: 5 * 60 * 1000,
      dbName: process.env.MONGO_DB,
      autoIndex: false
    }),
    FilmModule],
  controllers: [StarwarsController],
  providers: [FilmService]
  //  exports: [FILM_REPOSITORY]
})
export class AppModule { }
