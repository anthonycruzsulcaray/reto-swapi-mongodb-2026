const {
  HybridFilmRepository,
} = require('../dist/reto-swapi/infrastructure/repository/film.repository');

const filmData = {
  episode_id: 4,
  title: 'A New Hope',
  opening_crawl: 'A long time ago...',
  director: 'George Lucas',
  producer: 'Gary Kurtz',
  release_date: '1977-05-25',
  characters: ['https://swapi.dev/api/people/1/'],
  planets: ['https://swapi.dev/api/planets/1/'],
  starships: ['https://swapi.dev/api/starships/2/'],
  vehicles: [],
  species: [],
  created: '2014-12-10T14:23:31.880000Z',
  edited: '2014-12-20T19:49:45.256000Z',
  url: 'https://swapi.dev/api/films/1/',
};

describe('HybridFilmRepository', () => {
  it('validates pagination and returns only the public film fields', async () => {
    const storedFilm = { ...filmData, id: 1, _id: 'mongodb-id', __v: 0 };
    const mongo = {
      getCountTotalFilms: jest.fn().mockResolvedValue(11),
      getListFilmsByPaged: jest.fn().mockResolvedValue([storedFilm]),
    };
    const repository = new HybridFilmRepository(mongo, {});

    await expect(
      repository.getListFilms({ page: '2', size: '5' }),
    ).resolves.toEqual({
      count: 11,
      pages: 3,
      results: [{ ...filmData, id: 1 }],
    });
    expect(mongo.getListFilmsByPaged).toHaveBeenCalledWith(2, 5);
    await expect(repository.getListFilms({ page: '0' })).rejects.toThrow();
  });

  it('commits MySQL film relations before saving the generated ID in MongoDB', async () => {
    const transaction = {
      query: jest.fn().mockReturnThis(),
      commit: jest.fn().mockResolvedValue([{ insertId: 7 }]),
    };
    const mysql = {
      init: jest.fn().mockResolvedValue({ transaction: () => transaction }),
      addFilm: jest.fn((_film, tx) => tx.query('INSERT film')),
      addRelation: jest.fn((_table, _value, tx) => tx.query('INSERT relation')),
    };
    const mongo = { addNewFilm: jest.fn().mockResolvedValue(undefined) };
    const repository = new HybridFilmRepository(mongo, mysql);

    await expect(repository.createFilm(filmData)).resolves.toEqual({
      ...filmData,
      id: 7,
    });
    expect(transaction.commit).toHaveBeenCalledTimes(1);
    expect(mysql.addRelation).toHaveBeenCalledTimes(3);
    expect(mongo.addNewFilm).toHaveBeenCalledWith({ ...filmData, id: 7 });
  });

  it('rejects invalid film data before opening a MySQL transaction', async () => {
    const mysql = { init: jest.fn() };
    const repository = new HybridFilmRepository({}, mysql);

    await expect(repository.createFilm({ title: '' })).rejects.toThrow();
    expect(mysql.init).not.toHaveBeenCalled();
  });
});
