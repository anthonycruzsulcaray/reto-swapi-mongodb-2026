import serverlessMysql from "serverless-mysql";
import { MysqlConfigReader } from "../connection/mysqlConnectReader";
import { MysqlConfigWriter } from "../connection/mysqlConnectWriter";
import { Injectable } from "@nestjs/common";
import { Characters, Film, OkPacket, Planets, Species, Starships, Vehicles } from "../entity/mysql.entity";

@Injectable()
export class FilmQueryMysql {
    connReader: serverlessMysql.ServerlessMysql;
    connWriter: serverlessMysql.ServerlessMysql;

    constructor(private mySqlReader: MysqlConfigReader, private mySqlWriter: MysqlConfigWriter) {
        this.connReader = this.mySqlReader.conn()
        this.connWriter = this.mySqlWriter.conn()
    }
    init = async () => {
        return this.connWriter;
    }

    commit = async (connection: serverlessMysql.Transaction) => {
        await connection.commit();
    }

    rollBack = async (connection: serverlessMysql.Transaction) => {
        await connection.rollback;
    }


    async getListFilms(idFilm: number) {
        return await this.connReader.query("SELECT * FROM film WHERE id=?", [idFilm]);
    }
    addFilm = (film: Film, connection: serverlessMysql.Transaction) => {
        return connection.query(
            " INSERT INTO film (episode_id, title, opening_crawl, director, producer, release_date, created, edited, url) " +
            " VALUES (?,?,?,?,?,?,?,?,?)",
            [film.episode_id, film.title, film.opening_crawl, film.director, film.producer, film.release_date, film.created, film.edited, film.url]
        );
    }
    addCharacters = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return [
                "INSERT INTO characters (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]
            ]
        });
    }
    addPlanets = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return [
                "INSERT INTO planets (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]
            ]
        });
    }
    addStarships = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return ["INSERT INTO starships (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]]
        });
    }
    addVehicles = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return ["INSERT INTO vehicles (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]]
        });
    }
    addSpecies = (value: string, connection: serverlessMysql.Transaction) => {
        return connection.query((_lastResult: any, allResult: any) => {
            return ["INSERT INTO species (value, id_film) VALUES (?,?)",
                [value, allResult[0].insertId]]
        });
    }

}