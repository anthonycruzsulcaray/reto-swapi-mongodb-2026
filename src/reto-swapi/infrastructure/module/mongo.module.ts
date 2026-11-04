import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FilmMongo, FilmShchema } from '../persistence/mongodb/schemas/film.schema';
import { FilmQueryMongoDB } from '../persistence/mongodb/query/film.query';

@Module({
    imports: [
        MongooseModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                uri: 'mongodb://localhost:27017',
                minPoolSize: 1,
                maxPoolSize: 2,
                maxIdleTimeMS: 5 * 60 * 1000,
                dbName: configService.getOrThrow<string>('mongoParamters.dbName'),
                autoIndex: false,
            }),
        }),
        MongooseModule.forFeature([
            { name: FilmMongo.name, schema: FilmShchema }
        ])
    ],
    controllers: [],
    providers: [
        FilmQueryMongoDB
    ],
    exports: [
        FilmQueryMongoDB
    ]
})
export class MongoModule { }


/*
 imports: [
           mongoose_1.MongooseModule.forRoot(process.env.MONGO_PROTOCOL + "://" + process.env.MONGO_DATABASE + ":" + process.env.MONGO_PASWWORD + "@" + process.env.MONGO_CLUSTER, {
               minPoolSize: 1,
               maxPoolSize: 2,
               maxIdleTimeMS: 5 * 60 * 1000,
               dbName: process.env.MONGO_SCHEMA,
               autoIndex: false
           })
       ],
 */