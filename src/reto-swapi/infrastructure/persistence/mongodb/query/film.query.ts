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

    // AGREGAR
    addNewFilm(request: FilmMongo) {
        return this.entityModel.create(request)
    }
    /*
    // EDITAR
    editAddres(idUser: number, idAddressStreet: number, request: FilmMongo) {
        return this.entityModel.findOneAndUpdate(
            { userId: idUser, id: idAddressStreet }, {
            $set: request
        }).exec();
    }

    // ELIMINAR
    deleteAddressStret(idAddressStreet: number) {
        return this.entityModel.findOneAndDelete({ id: idAddressStreet }).exec();
    }
    */

}