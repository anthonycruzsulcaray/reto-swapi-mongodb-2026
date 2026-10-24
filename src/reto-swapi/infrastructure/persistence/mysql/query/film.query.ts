import serverlessMysql from "serverless-mysql";
import { MysqlConfigReader } from "../connection/mysqlConnectReader";
import { MysqlConfigWriter } from "../connection/mysqlConnectWriter";
import { Injectable } from "@nestjs/common";
import { OkPacket } from "../entity/mysql.entity";

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
        return await this.connReader.query("SELECT * FROM film WHERE id=? ORDER BY id DESC", [idFilm]);
    }


    async addFilm(episode_id: number, title: string): Promise<OkPacket> {
        return (await this.connWriter.query<OkPacket>(
            "INSERT INTO film (episode_id, title) VALUES (?,?)",
            [episode_id, title]
        ));
    }

}