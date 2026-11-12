import { Module } from '@nestjs/common';
import { FilmQueryMysql } from '../persistence/mysql/query/film.query';
import { MysqlConfig } from '../persistence/mysql/connection/mysqlConnect';
import { AuthQueryMysql } from '../persistence/mysql/query/auth.query';

@Module({
    imports: [],
    controllers: [],
    providers: [
        MysqlConfig,
        FilmQueryMysql,
        AuthQueryMysql
    ],
    exports: [
        FilmQueryMysql,
        AuthQueryMysql
    ]
})

export class MysqlModule { }
