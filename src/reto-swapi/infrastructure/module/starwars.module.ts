import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FilmService } from '../../application/service/film.service';
import { StarWarsService } from '../../application/service/starwars.service';
import { FILM_REPOSITORY } from '../../domain/repository/film.repository';
import { STARWARS_REPOSITORY } from '../../domain/repository/starwars.repository';
import { MongoModule } from './mongo.module';
import { MysqlModule } from './mysql.module';
import { AuthModule } from './auth.module';
import { HybridFilmRepository } from '../repository/film.repository';
import { StarwarsApiRest } from '../persistence/api/swapi.api';

@Module({
    imports: [HttpModule, MongoModule, MysqlModule, AuthModule],
    providers: [
        FilmService,
        {
            provide: FILM_REPOSITORY,
            useClass: HybridFilmRepository,
        },
        StarWarsService,
        {
            provide: STARWARS_REPOSITORY,
            useClass: StarwarsApiRest,
        },
    ],
    exports: [FILM_REPOSITORY, FilmService, StarWarsService],
})
export class StarwarsModule {}
