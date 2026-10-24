import { Injectable } from "@nestjs/common";
import { FilmBodyEnglish } from "../../domain/entities/film.entities";
import { FilmMongo } from "../persistence/mongodb/schemas/film.schema";
import { FilmQueryMongoDB } from "../persistence/mongodb/query/film.query";
import { FilmRepository } from "../../domain/repository/film.repository";
import { FilmQueryMysql } from "../persistence/mysql/query/film.query";
import { OkPacket } from "../persistence/mysql/entity/mysql.entity";


@Injectable()
export class HybridFilmRepository implements FilmRepository {
    constructor(
        private readonly filmMongoDB: FilmQueryMongoDB,
        private readonly filmMysql: FilmQueryMysql
    ) { }

    async getListFilms() {
        const response: FilmBodyEnglish[] = []
        const filmArray: FilmMongo[] = (await this.filmMongoDB.find({})) ?? [];
        response.push(...filmArray)
        return filmArray
    }

    async getFilmById(filmId: number): Promise<FilmBodyEnglish | null> {
        const film: FilmMongo | null = await this.filmMongoDB.findOne({ id: filmId })
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
        // let conn = (await this.filmMysql.init()).transaction()
        let resultDao: OkPacket = await this.filmMysql.addFilm(film.episode_id, film.title)
        console.log("resultDao::: ", resultDao)
        film.id = resultDao.insertId ?? 0
        await this.filmMongoDB.addNewFilm(film);
        return film
    }

}