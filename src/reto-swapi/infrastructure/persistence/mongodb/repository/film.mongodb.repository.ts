import { Injectable } from "@nestjs/common";
import { FilmBodySpanish, FilmBodyEnglish } from "../../../../domain/entities/film.entities";
import { FilmRepository } from "../../../../domain/repository/film.repository";

@Injectable()
export class FilmMongoRepository implements FilmRepository {
    constructor(
        // private readonly dynamoDatabase: MongoDataBase,
    ) {

        

    }
    getListFilms(): Promise<FilmBodySpanish[]> {
        throw new Error("Method not implemented.");
    }
    getFilmById(filmId: number): Promise<FilmBodySpanish | null> {
        throw new Error("Method not implemented.");
    }
    createFilm(film: FilmBodyEnglish): Promise<FilmBodySpanish | null> {
        throw new Error("Method not implemented.");
    }

}