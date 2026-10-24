export default () => ({
    mysqlParamters: {
        host: process.env.HOST,
        port: process.env.PORT ?? 3306,
        user: process.env.USER_DB,
        password: process.env.PASSWORD_DB,
        database: process.env.DATABASE
    }
});