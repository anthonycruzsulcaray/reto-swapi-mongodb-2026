const { Module } = require('@nestjs/common');
const { FilmQueryMysql } = require('../persistence/mysql/query/film.query');
const { MysqlConfig } = require('../persistence/mysql/connection/mysqlConnect');

class MysqlModule {}

Module({
  providers: [
    MysqlConfig,
    { provide: 'FilmQueryMysql', useClass: FilmQueryMysql },
  ],
  exports: ['FilmQueryMysql'],
})(MysqlModule);

module.exports = { MysqlModule };
