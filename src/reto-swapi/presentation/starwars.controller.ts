import { Body, Controller, Get, HttpCode, Param, Post, Headers } from "@nestjs/common";
import { FilmBodyEnglish, FilmBodyPaged } from "../domain/entities/film.entities";
import { FilmService } from "../application/service/film.service";

@Controller('starwars')
export class StarwarsController {
    constructor(
        private readonly filmService: FilmService
    ) { }

    @Get('mongo/films')
    @HttpCode(200)
    async getlistFilms(@Headers() headers: any): Promise<FilmBodyPaged> {
        return await this.filmService.getListFilms(headers)
    }

    @Post('mongo/films')
    @HttpCode(201)
    async addMongoFilm(@Body() requestBody: FilmBodyEnglish): Promise<FilmBodyEnglish | null> {
        return await this.filmService.createFilm(requestBody);
    }

    @Get('mongo/films/:id')
    @HttpCode(200)
    async getFilmById(@Param('id') id: string) {
        return await this.filmService.getFilmById(+id)
    }



}