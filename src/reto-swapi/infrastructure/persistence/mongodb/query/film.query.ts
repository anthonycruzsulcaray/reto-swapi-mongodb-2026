import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilmDocument, FilmMongo } from "../schemas/film.schema";
import { QueryFilter, Model, ProjectionType, QueryOptions } from "mongoose";
import { EntityRepository } from "../document/entity.document";


@Injectable()
export class FilmQueryMongoDB extends EntityRepository<FilmDocument> {
    constructor(@InjectModel(FilmMongo.name) filmModel: Model<FilmDocument>) {
        super(filmModel)
    }
    /*
    get(filter: QueryFilter<FilmDocument>, projection?: ProjectionType<FilmDocument>, options?: QueryOptions<FilmDocument>) {
        return this.entityModel.find(filter, projection, options)
    }

    getCount(filter: QueryFilter<FilmDocument>) {
        return this.entityModel.countDocuments(filter)
    }
    */
    getCountTotalFilms() {
        return this.entityModel.countDocuments()
    }
    getListFilmsByPaged(page: number, size: number) {
        const skip = (page - 1) * size;
        return this.entityModel.find().skip(skip).limit(size).exec()
    }
    addNewFilm(request: FilmMongo) {
        return this.entityModel.create(request)
    }

}