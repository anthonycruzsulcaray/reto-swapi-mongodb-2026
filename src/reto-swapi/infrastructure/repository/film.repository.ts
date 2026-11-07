import { Injectable } from "@nestjs/common";
import { FilmBodyEnglish, PagedFilms } from "../../domain/entities/film.entities";
import { FilmMongo } from "../persistence/mongodb/schemas/film.schema";
import { FilmQueryMongoDB } from "../persistence/mongodb/query/film.query";
import { FilmRepository } from "../../domain/repository/film.repository";
import { FilmQueryMysql } from "../persistence/mysql/query/film.query";
import { FilmMapper } from "../mapper/film.mapper";

@Injectable()
export class HybridFilmRepository implements FilmRepository {
    constructor(
        private readonly filmMongoDB: FilmQueryMongoDB,
        private readonly filmMysql: FilmQueryMysql,
    ) { }

    async getListFilmsByPaged(page: number, size: number): Promise<PagedFilms> {
        const [count, filmDocuments] = await Promise.all([
            this.filmMongoDB.getCountTotalFilms(),
            this.filmMongoDB.getListFilmsByPaged(page, size),
        ]);
        const films: FilmMongo[] = filmDocuments;
        const responseData: PagedFilms = {
            count,
            films: films.map(FilmMapper.toFilmBody),
        };
        return responseData;
    }

    async getFilmById(filmId: number): Promise<FilmBodyEnglish | null> {
        const film: FilmMongo | null = await this.filmMongoDB.findOne({ id: filmId })
        if (film === null) {
            return null
        }
        const responseData: FilmBodyEnglish = FilmMapper.toFilmBody(film);
        return responseData;
    }

    async createFilm(requestBody: FilmBodyEnglish): Promise<FilmBodyEnglish | null> {
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