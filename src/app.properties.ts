export default () => ({
    mysqlParameters: {
        host: process.env.MYSQL_HOST,
        port: Number(process.env.MYSQL_PORT),
        user: process.env.MYSQL_USER_DB,
        password: process.env.MYSQL_PASSWORD_DB,
        database: process.env.MYSQL_DATABASE
    },
    mongoParameters: {
        uri: process.env.MONGO_URI,
        dbName: process.env.MONGO_DB
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpirationSeconds: Number(process.env.JWT_EXPIRATION_SECONDS)
    }

});