import { INestApplication } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { FilmService } from '../../src/reto-swapi/application/service/film.service';
import { StarWarsService } from '../../src/reto-swapi/application/service/starwars.service';
import { StarwarsController } from '../../src/reto-swapi/infrastructure/controllers/starwars.controller';
import { JwtAuthGuard } from '../../src/reto-swapi/infrastructure/guards/jwt-auth.guard';

describe('StarwarsController endpoints', () => {
    const jwtSecret = 'test-secret-with-more-than-thirty-two-bytes';
    const user = {
        id: 21,
        uuid: 'user-uuid',
        name: 'Leia Organa',
        email: 'leia@example.com',
    };
    const film = {
        id: 1,
        episode_id: 4,
        title: 'A New Hope',
        opening_crawl: 'It is a period of civil war.',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: [],
        planets: [],
        starships: [],
        vehicles: [],
        species: [],
        created: '1977-05-25T00:00:00.000Z',
        edited: '1977-05-25T00:00:00.000Z',
        url: 'https://swapi.dev/api/films/1/',
    };
    const localFilms = { count: 1, pages: 1, results: [film] };
    const externalFilms = { count: 1, next: null, previous: null, results: [film] };

    let app: INestApplication;
    let jwtService: JwtService;
    let filmService: {
        getListFilms: jest.Mock;
        getFilmById: jest.Mock;
        createFilm: jest.Mock;
    };
    let starWarsService: {
        getListStarwars: jest.Mock;
        getStarwarsById: jest.Mock;
    };

    beforeAll(async () => {
        filmService = {
            getListFilms: jest.fn(),
            getFilmById: jest.fn(),
            createFilm: jest.fn(),
        };
        starWarsService = {
            getListStarwars: jest.fn(),
            getStarwarsById: jest.fn(),
        };

        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                JwtModule.register({
                    secret: jwtSecret,
                    signOptions: { algorithm: 'HS256' },
                }),
            ],
            controllers: [StarwarsController],
            providers: [
                JwtAuthGuard,
                { provide: FilmService, useValue: filmService },
                { provide: StarWarsService, useValue: starWarsService },
            ],
        }).compile();

        app = moduleFixture.createNestApplication();
        jwtService = moduleFixture.get(JwtService);
        await app.init();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        filmService.getListFilms.mockResolvedValue(localFilms);
        filmService.getFilmById.mockResolvedValue(film);
        filmService.createFilm.mockResolvedValue(film);
        starWarsService.getListStarwars.mockResolvedValue(externalFilms);
        starWarsService.getStarwarsById.mockResolvedValue(film);
    });

    afterAll(async () => {
        await app.close();
    });

    const authorizationHeader = async (): Promise<string> => {
        const token = await jwtService.signAsync(user);
        return `Bearer ${token}`;
    };

    it('rejects a request without a bearer token', async () => {
        await request(app.getHttpServer()).get('/starwars/films').expect(401);
    });

    it('GET /starwars/films returns stored films', async () => {
        const authorization = await authorizationHeader();

        await request(app.getHttpServer())
            .get('/starwars/films')
            .set('Authorization', authorization)
            .expect(200)
            .expect(localFilms);

        expect(filmService.getListFilms).toHaveBeenCalledWith(
            expect.objectContaining({ authorization }),
        );
    });

    it('GET /starwars/films/:id returns a stored film', async () => {
        await request(app.getHttpServer())
            .get('/starwars/films/1')
            .set('Authorization', await authorizationHeader())
            .expect(200)
            .expect(film);

        expect(filmService.getFilmById).toHaveBeenCalledWith(1);
    });

    it('POST /starwars/films creates a stored film', async () => {
        await request(app.getHttpServer())
            .post('/starwars/films')
            .set('Authorization', await authorizationHeader())
            .send(film)
            .expect(201)
            .expect(film);

        expect(filmService.createFilm).toHaveBeenCalledWith(film);
    });

    it('GET /starwars/api/films returns external films', async () => {
        await request(app.getHttpServer())
            .get('/starwars/api/films')
            .set('Authorization', await authorizationHeader())
            .expect(200)
            .expect(externalFilms);

        expect(starWarsService.getListStarwars).toHaveBeenCalledTimes(1);
    });

    it('GET /starwars/api/films/:id returns an external film', async () => {
        await request(app.getHttpServer())
            .get('/starwars/api/films/1')
            .set('Authorization', await authorizationHeader())
            .expect(200)
            .expect(film);

        expect(starWarsService.getStarwarsById).toHaveBeenCalledWith(1);
    });
});
