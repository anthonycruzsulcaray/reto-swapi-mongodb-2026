import { FilmBodyEnglish } from "../../domain/entities/film.entities";
import { FilmMongo } from "../persistence/mongodb/schemas/film.schema";

export class FilmMapper {
    static toFilmBody(film: FilmMongo): FilmBodyEnglish {
        return {
            id: film.id,
            episode_id: film.episode_id,
            title: film.title,
            opening_crawl: film.opening_crawl,
            director: film.director,
            producer: film.producer,
            release_date: film.release_date,
            characters: film.characters,
            planets: film.planets,
            starships: film.starships,
            vehicles: film.vehicles,
            species: film.species,
            created: film.created,
            edited: film.edited,
            url: film.url,
        };
    }
}
