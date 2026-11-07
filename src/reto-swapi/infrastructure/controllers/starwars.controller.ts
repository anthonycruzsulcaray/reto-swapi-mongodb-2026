import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from "@nestjs/common";
import { FilmBodyEnglish, FilmBodyPaged, ApiFilmPagedEnglish } from "../../domain/entities/film.entities";
import { FilmService } from "../../application/service/film.service";
import { StarWarsService } from "../../application/service/starwars.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { JoiValidationPipe } from "../utils/validation/joi";
import { CreateFilmSchema, IdFilmSchema, PageFilterSchema } from "../validation/film.validation";

@Controller('starwars')
@UseGuards(JwtAuthGuard)
export class StarwarsController {
    constructor(
        private readonly filmService: FilmService,
        private readonly starwarsService: StarWarsService,
    ) { }

    @Get('films')
    @HttpCode(200)
    async getlistFilms(
        @Query(new JoiValidationPipe(PageFilterSchema)) filters: { page: number; size: number }): Promise<FilmBodyPaged> {
        return this.filmService.getListFilms(filters.page, filters.size)
    }

    @Get('films/:id')
    @HttpCode(200)
    async getFilmById(
        @Param(new JoiValidationPipe(IdFilmSchema)) params: { id: number },
    ) {
        return await this.filmService.getFilmById(params.id)
    }

    @Post('films')
    @HttpCode(201)
    async addFilm(
        @Body(new JoiValidationPipe(CreateFilmSchema)) requestBody: FilmBodyEnglish,
    ): Promise<FilmBodyEnglish | null> {
        return await this.filmService.createFilm(requestBody);
    }

    @Get('api/films')
    @HttpCode(200)
    async getListApiFilms(): Promise<ApiFilmPagedEnglish> {
        return await this.starwarsService.getListStarwars();
    }

    @Get('api/films/:id')
    @HttpCode(200)
    async getListApiFilmsById(
        @Param(new JoiValidationPipe(IdFilmSchema)) params: { id: number },
    ): Promise<FilmBodyEnglish | null> {
        return await this.starwarsService.getStarwarsById(params.id);
    }
}