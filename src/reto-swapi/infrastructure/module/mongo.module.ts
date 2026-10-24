import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmMongo, FilmShchema } from '../persistence/mongodb/schemas/film.schema';
// import { FilmMongoRepository } from '../persistence/mongodb/repository/film.mongodb.repository';
import { FILM_REPOSITORY } from '../../domain/repository/film.repository';
import { FilmQueryMongoDB } from '../persistence/mongodb/query/film.query';
import { HybridFilmRepository } from '../repository/film.repository';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FilmMongo.name, schema: FilmShchema }
        ])
    ],
    controllers: [],
    providers: [
        FilmQueryMongoDB
    ],
    exports: [
        FilmQueryMongoDB
    ]
})
export class MongoModule { }
