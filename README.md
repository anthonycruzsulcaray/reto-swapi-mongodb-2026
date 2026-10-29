# Reto SWAPI con JavaScript y NestJS

Réplica en JavaScript del proyecto original en TypeScript. Mantiene NestJS, los endpoints de películas, la persistencia en MongoDB y el registro transaccional en MySQL. Para aprender JavaScript, las clases y funciones están escritas sin interfaces ni anotaciones de tipos; los decorators de Nest se aplican como funciones (`Controller(...)`, `Injectable()`, etc.).

## Requisitos

- Node.js 20 o posterior
- MongoDB y MySQL para ejecutar la API con persistencia

## Instalar y ejecutar

```bash
npm install
npm test
npm start
```

`npm start` arranca el servidor en el puerto `APP_PORT` (3000 por defecto). Para modo desarrollo con reinicio automático:

```bash
npm run start:dev
```

Configura las conexiones mediante variables de entorno:

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `APP_PORT` | Puerto HTTP | `3000` |
| `MONGO_URI` | URI de MongoDB | `mongodb://127.0.0.1:27017/starwars` |
| `MONGO_DB` | Base de datos MongoDB | `starwars` |
| `MYSQL_HOST` | Host MySQL (`HOST` también se admite) | — |
| `MYSQL_PORT` | Puerto MySQL (`DB_PORT` también se admite) | `3306` |
| `USER_DB` | Usuario MySQL | — |
| `PASSWORD_DB` | Contraseña MySQL | — |
| `DATABASE` | Base de datos MySQL | — |

## API

- `GET /starwars/mongo/films` — lista paginada; recibe `page` y `size` en headers.
- `GET /starwars/mongo/films/:id` — busca una película por ID.
- `POST /starwars/mongo/films` — valida la película, la registra en MySQL y la guarda en MongoDB.

## Build y pruebas

JavaScript se ejecuta directamente en Node.js; no necesita una compilación de tipos. `npm run build` prepara la carpeta `dist/` y verifica la sintaxis de todos los archivos JavaScript. `npm test` genera ese build y prueba los tres endpoints con una aplicación NestJS y un repositorio simulado, sin exigir que MongoDB o MySQL estén activos.

```bash
npm run build
npm test
npm run start:prod
```

La arquitectura conserva las capas de presentación, aplicación, dominio e infraestructura bajo `src/reto-swapi/`.
