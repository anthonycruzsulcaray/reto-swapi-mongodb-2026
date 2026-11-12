import { Inject, Injectable } from "@nestjs/common";
import { FilmBodyEnglish, ApiFilmPagedEnglish } from "../../domain/entities/film.entities";
import type { StarwarsRepository } from "../../domain/repository/starwars.repository";
import { STARWARS_REPOSITORY } from "../../domain/repository/starwars.repository";

@Injectable()
export class StarWarsService {
    constructor(
        @Inject(STARWARS_REPOSITORY)
        private readonly starwarsRepository: StarwarsRepository
    ) { }

    async getListStarwars(): Promise<ApiFilmPagedEnglish> {
        return await this.starwarsRepository.getListStarwars();
    }
    
    async getStarwarsById(id: number): Promise<FilmBodyEnglish | null> {
        return await this.starwarsRepository.getStarwarsById(id);
    }


}