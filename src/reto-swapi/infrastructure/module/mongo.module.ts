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
                uri: configService.getOrThrow<string>('mongoParameters.uri'),
                dbName: configService.getOrThrow<string>('mongoParameters.dbName'),
                minPoolSize: 1,
                maxPoolSize: 2,
                maxIdleTimeMS: 5 * 60 * 1000,
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
