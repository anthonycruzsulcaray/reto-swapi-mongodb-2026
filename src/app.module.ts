import { Module } from '@nestjs/common';
import { StarwarsController } from './reto-swapi/presentation/starwars.controller';
import { FilmService } from './reto-swapi/application/service/film.service';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoModule } from './reto-swapi/infrastructure/module/mongo.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './app.properties'
import { MysqlModule } from './reto-swapi/infrastructure/module/mysql.module';
import { FILM_REPOSITORY } from './reto-swapi/domain/repository/film.repository';
import { HybridFilmRepository } from './reto-swapi/infrastructure/repository/film.repository';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true
    }),
    MongooseModule.forRoot('mongodb://localhost/27017', {
      minPoolSize: 1,
      maxPoolSize: 2,
      maxIdleTimeMS: 5 * 60 * 1000,
      dbName: process.env.MONGO_DB,
      autoIndex: false
    }),
    MongoModule, MysqlModule],
  controllers: [StarwarsController],
  providers: [FilmService,
    {
      provide: FILM_REPOSITORY,
      useClass: HybridFilmRepository
    }
  ],
  exports: [FILM_REPOSITORY]

})
export class AppModule { }

/*
 imports: [
           mongoose_1.MongooseModule.forRoot(process.env.MONGO_PROTOCOL + "://" + process.env.MONGO_DATABASE + ":" + process.env.MONGO_PASWWORD + "@" + process.env.MONGO_CLUSTER, {
               minPoolSize: 1,
               maxPoolSize: 2,
               maxIdleTimeMS: 5 * 60 * 1000,
               dbName: process.env.MONGO_SCHEMA,
               autoIndex: false
           })
       ],
 */