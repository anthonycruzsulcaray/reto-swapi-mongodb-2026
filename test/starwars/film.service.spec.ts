import { FilmBodyEnglish } from '../../src/reto-swapi/domain/entities/film.entities';
import type { FilmRepository } from '../../src/reto-swapi/domain/repository/film.repository';
import { FilmService } from '../../src/reto-swapi/application/service/film.service';

describe('FilmService', () => {
    let service: FilmService;
    let repository: jest.Mocked<FilmRepository>;

    const film: FilmBodyEnglish = {
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

    beforeEach(() => {
        repository = {
            getListFilmsByPaged: jest.fn(),
            getFilmById: jest.fn(),
            createFilm: jest.fn(),
        };
        service = new FilmService(repository);
    });

    it('builds the paged response from repository data', async () => {
        const headers = { authorization: 'Bearer token' };
        repository.getListFilmsByPaged.mockResolvedValue({ count: 11, films: [film] });

        await expect(service.getListFilms(2, 5)).resolves.toEqual({
            count: 11,
            pages: 3,
            results: [film],
        });
        expect(repository.getListFilmsByPaged).toHaveBeenCalledWith(2, 5);
    });

    it('returns a film by ID and forwards the ID', async () => {
        repository.getFilmById.mockResolvedValue(film);

        await expect(service.getFilmById(1)).resolves.toBe(film);
        expect(repository.getFilmById).toHaveBeenCalledWith(1);
    });

    it('creates a film and forwards its data', async () => {
        repository.createFilm.mockResolvedValue(film);

        await expect(service.createFilm(film)).resolves.toBe(film);
        expect(repository.createFilm).toHaveBeenCalledWith(film);
    });
});
