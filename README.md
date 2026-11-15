<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Registro y autenticación

Antes de iniciar la aplicación, crea la base y tabla de usuarios ejecutando
`database/auth-schema.sql` en MySQL. La base de autenticación se llama `swapi_auth`.
La conexión usa `HOST`, `PORT`, `USER_DB` y `PASSWORD_DB` ya configurados para MySQL
en este proyecto.

El endpoint público `POST /auth/register` recibe nombre, email y contraseña:

```json
{
  "name": "Nombre de usuario",
  "email": "usuario@example.com",
  "password": "una-contraseña-segura"
}
```

El email debe ser único y la contraseña tener al menos 8 caracteres y un máximo de
72 bytes para ser compatible con bcrypt. Se guarda
como hash bcrypt, nunca en texto plano. El endpoint público `POST /auth/login` recibe
el email y contraseña registrados:

```json
{
  "email": "usuario@example.com",
  "password": "una-contraseña-segura"
}
```

Configura `JWT_SECRET` con una clave aleatoria de al menos 32 bytes.
`JWT_EXPIRATION_SECONDS` es opcional y tiene un valor predeterminado de 900 segundos.
El login devuelve `accessToken`, `tokenType` y `expiresIn`; el payload del token incluye
`id`, `uuid`, `name` y `email` del usuario, y se verifica su firma HS256 y expiración.

Ejemplo de uso:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d "{\"name\":\"Nombre de usuario\",\"email\":\"usuario@example.com\",\"password\":\"una-contraseña-segura\"}"

curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"usuario@example.com\",\"password\":\"una-contraseña-segura\"}"

curl http://localhost:3000/starwars/api/films \
  -H "Authorization: Bearer <accessToken>"
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Docker local

1. Si no tienes `.env`, copia `.env.example` a `.env`; si ya existe, agrega las
   variables que falten sin reemplazar tus valores. Usa contraseñas y `JWT_SECRET`
   propios. No subas `.env` al repositorio.
2. Desde la raíz del proyecto, ejecuta:

   ```bash
   docker compose up --build
   ```

3. La API queda disponible en `http://localhost:3000`. MySQL y MongoDB corren en
   Docker; la API los alcanza por la red de Compose. MySQL se publica en
   `localhost:3307`, según `MYSQL_PORT_DOCKER`, para no chocar con un MySQL local
   que use el puerto `3306`. La API dentro de Docker usa `mysql:3306`; ese puerto
   interno es distinto del publicado en Windows.

MySQL carga los SQL existentes solo cuando su volumen está vacío. El SQL de
autenticación inserta un usuario de muestra; revísalo y no uses ese registro como
dato inicial de producción. Los datos de ambas bases se conservan en volúmenes
al detener los contenedores con `docker compose down`; borrar los volúmenes
también elimina esos datos. Puedes conectar Workbench a `localhost` en el puerto
de `MYSQL_PORT_DOCKER` con el usuario indicado por `MYSQL_USER_DB_LOCAL`, y
Studio 3T a `localhost` en el puerto `MONGO_PORT_DOCKER`.

Esta configuración es para desarrollo local. Para EC2, primero construye y
prueba la imagen de la API; en producción recomiendo usar Amazon RDS para MySQL
y un servicio MongoDB administrado, en vez de guardar ambas bases en el disco
del mismo EC2. Guarda secretos en AWS Secrets Manager o Systems Manager
Parameter Store, no en la imagen ni en el repositorio, y limita los puertos de
las bases a la red privada.

### Compose para EC2 con bases administradas

Para conectar la API de EC2 a RDS y MongoDB Atlas sin iniciar bases de datos en
EC2, usa las variables sin sufijo `_LOCAL` de `.env` y ejecuta:

```bash
docker compose -f docker-compose.prod.yml up --build -d
```

Este Compose inicia solo la API y mapea `MYSQL_HOST`, `MYSQL_PORT`,
`MYSQL_USER_DB`, `MYSQL_PASSWORD_DB`, `MYSQL_DATABASE`, `MONGO_URI`, `MONGO_DB`
y la configuración JWT desde `.env`. En AWS, permite el acceso a RDS desde el
grupo de seguridad de EC2 y configura la lista de acceso de Atlas para la
conexión de EC2. Para tráfico público, limita el puerto de la API en el grupo de
seguridad o colócala detrás de un balanceador.

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
