const { Test } = require('@nestjs/testing');
const request = require('supertest');
const {
  FILM_REPOSITORY,
} = require('../dist/reto-swapi/domain/repository/film.repository');
const {
  StarwarsController,
} = require('../dist/reto-swapi/presentation/starwars.controller');
const {
  FilmService,
} = require('../dist/reto-swapi/application/service/film.service');

describe('Star Wars films API', () => {
  let app;
  const repository = {
    getListFilms: jest.fn(),
    getFilmById: jest.fn(),
    createFilm: jest.fn(),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [StarwarsController],
      providers: [
        FilmService,
        { provide: FILM_REPOSITORY, useValue: repository },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns paginated films', async () => {
    const responseBody = {
      count: 1,
      pages: 1,
      results: [{ id: 1, title: 'A New Hope' }],
    };
    repository.getListFilms.mockResolvedValue(responseBody);

    await request(app.getHttpServer())
      .get('/starwars/mongo/films')
      .set('page', '1')
      .set('size', '5')
      .expect(200, responseBody);

    expect(repository.getListFilms).toHaveBeenCalledWith(
      expect.objectContaining({ page: '1', size: '5' }),
    );
  });

  it('creates a film', async () => {
    const film = { episode_id: 4, title: 'A New Hope' };
    repository.createFilm.mockResolvedValue({ ...film, id: 1 });

    await request(app.getHttpServer())
      .post('/starwars/mongo/films')
      .send(film)
      .expect(201, { ...film, id: 1 });

    expect(repository.createFilm).toHaveBeenCalledWith(film);
  });

  it('returns a film by numeric id', async () => {
    const film = { id: 1, title: 'A New Hope' };
    repository.getFilmById.mockResolvedValue(film);

    await request(app.getHttpServer())
      .get('/starwars/mongo/films/1')
      .expect(200, film);

    expect(repository.getFilmById).toHaveBeenCalledWith(1);
  });
});
