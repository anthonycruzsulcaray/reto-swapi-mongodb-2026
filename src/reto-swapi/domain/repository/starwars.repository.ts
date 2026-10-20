import { FilmBodyEnglish, FilmBodyPagedEnglish } from "../entities/film.entities";

export const STARWARS_REPOSITORY = Symbol('STARWARS_REPOSITORY');

export interface StarwarsRepository {
    getListStarwars(): Promise<FilmBodyPagedEnglish>;
    getStarwarsById(): Promise<FilmBodyEnglish | null>;
}