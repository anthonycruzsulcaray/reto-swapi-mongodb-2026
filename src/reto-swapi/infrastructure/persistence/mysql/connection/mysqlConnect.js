const { Inject, Injectable } = require('@nestjs/common');
const { ConfigService } = require('@nestjs/config');
const serverlessMysql = require('serverless-mysql');

class MysqlConfig {
  constructor(configService) {
    this.configService = configService;
  }

  conn() {
    return serverlessMysql({
      config: this.configService.get('mysqlParameters'),
      backoff: 'full',
      zombieMaxTimeout: 120,
      manageConns: true,
    });
  }
}

Inject(ConfigService)(MysqlConfig, undefined, 0);
Injectable()(MysqlConfig);

module.exports = { MysqlConfig };
