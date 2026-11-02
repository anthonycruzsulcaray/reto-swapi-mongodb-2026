import { Body, Controller, Get, HttpCode, Param, Post, Headers } from "@nestjs/common";
import { FilmBodyEnglish, FilmBodyPaged, FilmBodyPagedEnglish } from "../../domain/entities/film.entities";
import { FilmService } from "../../application/service/film.service";
import { StarWarsService } from "../../application/service/starwars.service";

@Controller('starwars')
export class StarwarsController {
    constructor(
        private readonly filmService: FilmService,
        private readonly starwarsService: StarWarsService,
    ) { }

    @Get('/films')
    @HttpCode(200)
    async getlistFilms(@Headers() headers: any): Promise<FilmBodyPaged> {
        return await this.filmService.getListFilms(headers)
    }

    @Get('films/:id')
    @HttpCode(200)
    async getFilmById(@Param('id') id: string) {
        return await this.filmService.getFilmById(+id)
    }

    @Post('films')
    @HttpCode(201)
    async addMongoFilm(@Body() requestBody: FilmBodyEnglish): Promise<FilmBodyEnglish | null> {
        return await this.filmService.createFilm(requestBody);
    }

    @Get('api/films')
    @HttpCode(200)
    async listFilms(): Promise<FilmBodyPagedEnglish> {
        return await this.starwarsService.getListStarwars();
    }

    @Get('api/films/:id')
    @HttpCode(200)
    async listFilmsById(@Param('id') id: string): Promise<FilmBodyEnglish | null> {
        return await this.starwarsService.getStarwarsById(+id);
    }
}