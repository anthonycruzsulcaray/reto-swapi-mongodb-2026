import serverlessMysql, { ServerlessMysql } from 'serverless-mysql';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MysqlConfig {
    constructor(
        private configService: ConfigService,
    ) { }

    conn(database?: string): ServerlessMysql {
        let configParameters = this.configService.get("mysqlParameters");
        if (database) {
            configParameters.database = database;
        }
        const configMysql = {
            config: configParameters,
            backoff: "10",
            zombieMaxTimeout: 120,
            manageConns: true,
            onConnect: () => { /*console.log('onConnect...');*/ }
        };
        return serverlessMysql(configMysql)
    }

}
