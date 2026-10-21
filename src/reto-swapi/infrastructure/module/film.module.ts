import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmMongo, FilmShchema } from '../persistence/mongodb/schemas/film.schema';
// import { StarwarsController } from '../../presentation/starwars.controller';
import { FilmMongoRepository } from '../persistence/mongodb/repository/film.mongodb.repository';
import { FILM_REPOSITORY } from '../../domain/repository/film.repository';


@Module({
    imports: [
        MongooseModule.forFeature([
            { name: FilmMongo.name, schema: FilmShchema }
        ])
    ],
    // controllers: [StarwarsController],
    providers: [{
        provide: FILM_REPOSITORY,
        useClass: FilmMongoRepository,
    }]
})
export class FilmModule { }
