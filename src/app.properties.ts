export default () => ({
    mysqlParameters: {
        host: process.env.HOST,
        port: Number(process.env.PORT),
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE
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