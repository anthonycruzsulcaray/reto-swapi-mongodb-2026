import { FilmBodyEnglish, FilmBodyPagedEnglish, FilmBodySpanish } from "../../domain/entities/film.entities";
import { FilmRepository } from "../../domain/repository/film.repository"

export class FilmService {
    constructor(
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