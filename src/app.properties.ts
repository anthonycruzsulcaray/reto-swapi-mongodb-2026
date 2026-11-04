export default () => ({
    mysqlParamters: {
        host: process.env.HOST,
        port: Number(process.env.PORT),
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE
    },
    mongoParamters: {
        host: process.env.MONGO_HOST,
        port: Number(process.env.MONGO_PORT),
        dbName: process.env.MONGO_DB,
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
        protocol: process.env.MONGO_PROTOCOL,
        cluster: process.env.MONGO_CLUSTER
    },
    auth: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpirationSeconds: Number(process.env.JWT_EXPIRATION_SECONDS)
    }

});