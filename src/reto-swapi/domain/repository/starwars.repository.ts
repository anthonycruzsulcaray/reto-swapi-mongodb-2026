import { FilmBodyEnglish, ApiFilmPagedEnglish } from "../entities/film.entities";

export const STARWARS_REPOSITORY = Symbol('STARWARS_REPOSITORY');

export interface StarwarsRepository {
    getListStarwars(): Promise<ApiFilmPagedEnglish>;
    getStarwarsById(id: number): Promise<FilmBodyEnglish | null>;
}