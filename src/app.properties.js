module.exports = () => ({
  mysqlParameters: {
    host: process.env.MYSQL_HOST || process.env.HOST,
    port: Number(
      process.env.MYSQL_PORT || process.env.DB_PORT || process.env.PORT || 3306,
    ),
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
  },
});
