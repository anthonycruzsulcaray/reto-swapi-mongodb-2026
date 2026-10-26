import serverlessMysql from "serverless-mysql";
import { MysqlConfig } from "../connection/mysqlConnect";
import { Injectable } from "@nestjs/common";
import { Characters, Film, OkPacket, Planets, Species, Starships, Vehicles } from "../entity/mysql.entity";

@Injectable()
export class FilmQueryMysql {
    connMysql: serverlessMysql.ServerlessMysql;

    constructor(private mySqlconfig: MysqlConfig) {
        this.connMysql = this.mySqlconfig.conn()
    }
    init = async () => {
        return this.connMysql;
    }

    commit = async (connection: serverlessMysql.Transaction) => {
        await connection.commit();
    }

    rollBack = async (connection: serverlessMysql.Transaction) => {
        await connection.rollback;
    }


    async getListFilms(idFilm: number) {
        return await this.connMysql.query("SELECT * FROM film WHERE id=?", [idFilm]);
    }
    addFilm = (film: Film, connection: serverlessMysql.Transaction) => {
        let sqlquery = connection.query(
            " INSERT INTO film (episode_id, title, opening_crawl, director, producer, release_date, created, edited, url) " +
            " VALUES (?,?,?,?,?,?,?,?,?)",
            [film.episode_id, film.title, film.opening_crawl, film.director, film.producer, film.release_date, film.created, film.edited, film.url]
        )
        console.log("sqlquery ::: ", sqlquery)
        return sqlquery;
    }
    addFilmCharacters = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return [
                "INSERT INTO starwars_db.character (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]
            ]
        });
    }
    addFilmPlanets = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return [
                "INSERT INTO planet (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]
            ]
        });
    }
    addFilmStarships = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return ["INSERT INTO starship (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]]
        });
    }
    addFilmVehicles = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return ["INSERT INTO vehicle (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]]
        });
    }
    addFilmSpecies = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return ["INSERT INTO specie (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]]
        });
    }

}