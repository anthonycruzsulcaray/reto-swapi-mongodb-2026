import { Module } from '@nestjs/common';
import { MysqlConfigReader } from '../persistence/mysql/connection/mysqlConnectReader';
import { FilmQueryMysql } from '../persistence/mysql/query/film.query';
import { MysqlConfigWriter } from '../persistence/mysql/connection/mysqlConnectWriter';
@Module({
    imports: [],
    controllers: [],
    providers: [
        MysqlConfigReader,
        MysqlConfigWriter,
        FilmQueryMysql
    ],
    exports: [
        FilmQueryMysql
    ]
})

export class MysqlModule { }
