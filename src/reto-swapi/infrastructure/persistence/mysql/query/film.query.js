const { Inject, Injectable } = require('@nestjs/common');
const { MysqlConfig } = require('../connection/mysqlConnect');

class FilmQueryMysql {
  constructor(mysqlConfig) {
    this.mysqlConfig = mysqlConfig;
    this.connection = mysqlConfig.conn();
  }

  init() {
    return this.connection;
  }

  addFilm(film, transaction) {
    return transaction.query(
      'INSERT INTO film (episode_id, title, opening_crawl, director, producer, release_date, created, edited, url) VALUES (?,?,?,?,?,?,?,?,?)',
      [
        film.episode_id,
        film.title,
        film.opening_crawl,
        film.director,
        film.producer,
        film.release_date,
        film.created,
        film.edited,
        film.url,
      ],
    );
  }

  addRelation(table, value, transaction) {
    return transaction.query((_previousResult, allResults) => [
      `INSERT INTO ${table} (value, id_film) VALUES (?,?)`,
      [value, allResults[0].insertId],
    ]);
  }
}

Inject(MysqlConfig)(FilmQueryMysql, undefined, 0);
Injectable()(FilmQueryMysql);

module.exports = { FilmQueryMysql };
