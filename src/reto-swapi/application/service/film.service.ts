import { Inject, Injectable } from "@nestjs/common";
import { FilmBodyEnglish, FilmBodyPaged } from "../../domain/entities/film.entities";
import { FILM_REPOSITORY } from "../../domain/repository/film.repository"
import type { FilmRepository } from "../../domain/repository/film.repository"

@Injectable()
export class FilmService {
    constructor(
        @Inject(FILM_REPOSITORY)
        private readonly filmRepository: FilmRepository,
    ) { }

    async getListFilms(page: number, size: number): Promise<FilmBodyPaged> {
        const { count, films } = await this.filmRepository.getListFilmsByPaged(page, size);
        const pages = Math.ceil(count / size);
        const responseData: FilmBodyPaged = {
            count,
            pages,
            results: films
        }
        return responseData;
    }

    async getFilmById(id: number): Promise<FilmBodyEnglish | null> {
        return await this.filmRepository.getFilmById(id);

    }

    async createFilm(film: FilmBodyEnglish): Promise<FilmBodyEnglish | null> {
        return await this.filmRepository.createFilm(film);

    }

}