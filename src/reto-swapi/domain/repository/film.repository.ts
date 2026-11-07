import { FilmBodyEnglish, PagedFilms } from "../entities/film.entities";

export const FILM_REPOSITORY = Symbol('FILM_REPOSITORY');

export interface FilmRepository {
  getListFilmsByPaged(page: number, size: number): Promise<PagedFilms>;
  getFilmById(filmId: number): Promise<FilmBodyEnglish | null>;
  createFilm(film: FilmBodyEnglish): Promise<FilmBodyEnglish | null>;
}