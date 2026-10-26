import { Injectable } from "@nestjs/common";
import { FilmBodyEnglish } from "../../domain/entities/film.entities";
import { FilmMongo } from "../persistence/mongodb/schemas/film.schema";
import { FilmQueryMongoDB } from "../persistence/mongodb/query/film.query";
import { FilmRepository } from "../../domain/repository/film.repository";
import { FilmQueryMysql } from "../persistence/mysql/query/film.query";
import { Film, OkPacket } from "../persistence/mysql/entity/mysql.entity";


@Injectable()
export class HybridFilmRepository implements FilmRepository {
    constructor(
        private readonly filmMongoDB: FilmQueryMongoDB,
        private readonly filmMysql: FilmQueryMysql
    ) { }

    async getListFilms(): Promise<FilmBodyEnglish[]> {
        const response: FilmBodyEnglish[] = []
        const filmArray: FilmMongo[] = (await this.filmMongoDB.find({})) ?? [];
        // response.push(...filmArray)
        filmArray.forEach(data => {
            response.push({
                id: data.id,
                episode_id: data.episode_id,
                title: data.title,
                opening_crawl: data.opening_crawl,
                director: data.director,
                producer: data.producer,
                release_date: data.release_date,
                characters: data.characters,
                planets: data.planets,
                starships: data.starships,
                vehicles: data.vehicles,
                species: data.species,
                created: data.created,
                edited: data.edited,
                url: data.url
            })
        });
        return response
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

    async createFilm(rq: FilmBodyEnglish): Promise<FilmBodyEnglish | null> {
        let conn = (await this.filmMysql.init()).transaction()
        try {
            let requestBody: Film = {
                id: 0,
                episode_id: rq.episode_id,
                title: rq.title,
                opening_crawl: rq.opening_crawl,
                director: rq.director,
                producer: rq.producer,
                release_date: rq.release_date,
                created: rq.created,
                edited: rq.edited,
                url: rq.url
            }

            conn = this.filmMysql.addFilm(requestBody, conn)
            rq.characters.forEach(value => {
                conn = this.filmMysql.addFilmCharacters(value, conn)
            });
            rq.planets.forEach(value => {
                conn = this.filmMysql.addFilmPlanets(value, conn)
            });
            rq.starships.forEach(value => {
                conn = this.filmMysql.addFilmStarships(value, conn)
            });
            rq.vehicles.forEach(value => {
                conn = this.filmMysql.addFilmVehicles(value, conn)
            });
            rq.species.forEach(value => {
                conn = this.filmMysql.addFilmSpecies(value, conn)
            });

            const data = await conn.commit();
            const indexFilmId = 0
            const orderId = data[indexFilmId].insertId
            rq.id = orderId
            await this.filmMongoDB.addNewFilm(rq);
            return rq
        } catch (error) {
            conn.rollback((_e: unknown) => { })
            throw error
        }
    }

}