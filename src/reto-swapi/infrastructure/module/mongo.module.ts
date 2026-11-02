import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmMongo, FilmShchema } from '../persistence/mongodb/schemas/film.schema';
import { FilmQueryMongoDB } from '../persistence/mongodb/query/film.query';

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
