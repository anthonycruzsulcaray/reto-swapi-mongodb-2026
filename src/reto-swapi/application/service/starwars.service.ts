import { FilmBodyEnglish, FilmBodyPagedEnglish } from "../../domain/entities/film.entities";
import { StarwarsRepository } from "../../domain/repository/starwars.repository";


export class StarWarsService {
    constructor(private readonly starwarsRepository: StarwarsRepository) { }

    async getListStarwars(): Promise<FilmBodyPagedEnglish> {
        return await this.starwarsRepository.getListStarwars();
    }

    async getStarwarsById(): Promise<FilmBodyEnglish | null> {
        return await this.starwarsRepository.getStarwarsById();
    }


}