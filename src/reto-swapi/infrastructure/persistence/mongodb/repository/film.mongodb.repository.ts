import { Injectable } from "@nestjs/common";
import { FilmBodyEnglish } from "../../../../domain/entities/film.entities";
import { FilmRepository } from "../../../../domain/repository/film.repository";
import { FilmQueryDocument } from "../query/film.query";
import { FilmMongo } from "../schemas/film.schema";

@Injectable()
export class FilmMongoRepository implements FilmRepository {
    constructor(
        private readonly filmquery: FilmQueryDocument
    ) { }

    async getListFilms(): Promise<FilmBodyEnglish[]> {
        const response: FilmBodyEnglish[] = []
        const filmArray: FilmMongo[] = (await this.filmquery.find({})) ?? [];
        response.push(...filmArray)
        return filmArray
    }
    async getFilmById(filmId: number): Promise<FilmBodyEnglish | null> {
        const film: FilmMongo | null = await this.filmquery.findOne({ id: filmId })
        if (film === null) {
            return null
        }
        const response: FilmBodyEnglish = {
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
            url: film.url
        }
        return response
    }
    async createFilm(film: FilmBodyEnglish): Promise<FilmBodyEnglish | null> {
        // await Promise.all(["funciones de querys"])
        await this.filmquery.addNewFilm(film);
        return film
    }

}