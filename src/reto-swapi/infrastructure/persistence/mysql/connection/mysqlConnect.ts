import serverlessMysql, { ServerlessMysql } from 'serverless-mysql';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MysqlConfig {
    constructor(
        private configService: ConfigService,
    ) { }

    conn(_database?: string): ServerlessMysql {
        // console.log("database :::", database)
        let configParameters = this.configService.get("mysqlParamters");

        let configMysql = {
            config: configParameters,
            backoff: "10",
            zombieMaxTimeout: 120,
            manageConns: true,
            onConnect: () => { /*console.log('onConnect...');*/ }
        };
        return serverlessMysql(configMysql)
    }

}
