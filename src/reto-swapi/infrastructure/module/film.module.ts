import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmMongo, FilmShchema } from '../persistence/mongodb/schemas/film.schema';
// import { StarwarsController } from '../../presentation/starwars.controller';
import { FilmMongoRepository } from '../persistence/mongodb/repository/film.mongodb.repository';
import { FILM_REPOSITORY } from '../../domain/repository/film.repository';
import { FilmQueryDocument } from '../persistence/mongodb/query/film.query';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FilmMongo.name, schema: FilmShchema }
        ])
    ],
    controllers: [],
    providers: [
        FilmQueryDocument,
        {
            provide: FILM_REPOSITORY,
            useClass: FilmMongoRepository,
        }
    ],
    exports: [FILM_REPOSITORY]
})
export class FilmModule { }
