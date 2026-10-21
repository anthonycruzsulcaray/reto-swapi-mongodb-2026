import { Inject, Injectable } from "@nestjs/common";
import { FilmBodyEnglish, FilmBodySpanish } from "../../domain/entities/film.entities";
// import * as filmRepository from "../../domain/repository/film.repository"
import { FILM_REPOSITORY } from "../../domain/repository/film.repository"
import type { FilmRepository } from "../../domain/repository/film.repository"

@Injectable()
export class FilmService {
    constructor(
        @Inject(FILM_REPOSITORY)
        private readonly filmRepository: FilmRepository,
    ) { }

    async getListFilms(): Promise<FilmBodySpanish[]> {
        return await this.filmRepository.getListFilms();
    }

    async getFilmById(id: number): Promise<FilmBodySpanish | null> {
        return await this.filmRepository.getFilmById(id);

    }

    async createFilm(film: FilmBodyEnglish): Promise<FilmBodySpanish | null> {
        return await this.filmRepository.createFilm(film);

    }

}