import { Module } from '@nestjs/common';
import { FilmQueryMysql } from '../persistence/mysql/query/film.query';
import { MysqlConfig } from '../persistence/mysql/connection/mysqlConnect';
@Module({
    imports: [],
    controllers: [],
    providers: [
        MysqlConfig,
        FilmQueryMysql
    ],
    exports: [
        FilmQueryMysql
    ]
})

export class MysqlModule { }
