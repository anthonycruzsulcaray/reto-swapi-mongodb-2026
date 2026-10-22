import { Body, Controller, Get, HttpCode, Param, Post } from "@nestjs/common";
import { FilmBodyEnglish } from "../domain/entities/film.entities";
import { FilmService } from "../application/service/film.service";

@Controller('starwars')
export class StarwarsController {
    constructor(
        private readonly filmService: FilmService
    ) { }

    @Get('mongo/films')
    @HttpCode(200)
    async getlistFilms(): Promise<FilmBodyEnglish[]> {
        return await this.filmService.getListFilms()
    }

    @Post('mongo/films')
    @HttpCode(201)
    async addDynamoFilm(@Body() requestBody: FilmBodyEnglish): Promise<FilmBodyEnglish | null> {
        return await this.filmService.createFilm(requestBody);
    }

    @Get('mongo/films/:id')
    @HttpCode(200)
    async getFilmById(@Param('id') id: string) {
        return await this.filmService.getFilmById(+id)
    }



}