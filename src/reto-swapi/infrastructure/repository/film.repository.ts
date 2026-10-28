import { Injectable } from "@nestjs/common";
import { FilmBodyEnglish, FilmBodyPaged } from "../../domain/entities/film.entities";
import { FilmMongo } from "../persistence/mongodb/schemas/film.schema";
import { FilmQueryMongoDB } from "../persistence/mongodb/query/film.query";
import { FilmRepository } from "../../domain/repository/film.repository";
import { FilmQueryMysql } from "../persistence/mysql/query/film.query";
import { v4 as uuidv4 } from 'uuid';
import { JoiValidationPipe } from "../utils/validation"
import { CreateFilmSchema, PageFilterSchema } from "../validation/film.validation";

@Injectable()
export class HybridFilmRepository implements FilmRepository {
    constructor(
        private readonly filmMongoDB: FilmQueryMongoDB,
        private readonly filmMysql: FilmQueryMysql
    ) { }

    async getListFilms(headers: any): Promise<FilmBodyPaged> {
        let idTransaccion = uuidv4();
        let page: number = Number(headers.page ?? 1)
        let size: number = Number(headers.size ?? 10)
        new JoiValidationPipe(PageFilterSchema).transform({ page, size }, idTransaccion)

        let response: FilmBodyPaged = {
            count: 0,
            pages: 0,
            results: []
        }
        const totalRecord = (await this.filmMongoDB.getCountTotalFilms());
        if (totalRecord == 0) {
            return response
        }
        const totalNumberPages = Math.ceil(totalRecord / size);
        const filmResponse: FilmMongo[] = (await this.filmMongoDB.getListFilmsByPaged(page, size));

        response.count = totalRecord
        response.pages = totalNumberPages

        filmResponse.forEach(data => {
            response.results.push({
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

    async createFilm(requestBody: FilmBodyEnglish): Promise<FilmBodyEnglish | null> {
        let idTransaccion = uuidv4();
        new JoiValidationPipe(CreateFilmSchema).transform({ ...requestBody }, idTransaccion)

        let conn = (await this.filmMysql.init()).transaction()
        try {
            conn = this.filmMysql.addFilm(requestBody, conn)

            requestBody.characters.forEach(value => {
                conn = this.filmMysql.addFilmCharacters(value, conn)
            });
            requestBody.planets.forEach(value => {
                conn = this.filmMysql.addFilmPlanets(value, conn)
            });
            requestBody.starships.forEach(value => {
                conn = this.filmMysql.addFilmStarships(value, conn)
            });
            requestBody.vehicles.forEach(value => {
                conn = this.filmMysql.addFilmVehicles(value, conn)
            });
            requestBody.species.forEach(value => {
                conn = this.filmMysql.addFilmSpecies(value, conn)
            });

            const data = await conn.commit();
            const indexFilmId = 0
            const orderId = data[indexFilmId].insertId
            requestBody.id = orderId
            await this.filmMongoDB.addNewFilm(requestBody);
            return requestBody
        } catch (error) {
            conn.rollback((_e: unknown) => { })
            throw error
        }
    }

}