import {
    FilmBodyEnglish,
    ApiFilmPagedEnglish,
} from '../../src/reto-swapi/domain/entities/film.entities';
import type { StarwarsRepository } from '../../src/reto-swapi/domain/repository/starwars.repository';
import { StarWarsService } from '../../src/reto-swapi/application/service/starwars.service';

describe('StarWarsService', () => {
    let service: StarWarsService;
    let repository: jest.Mocked<StarwarsRepository>;

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
    const films: ApiFilmPagedEnglish = {
        count: 1,
        next: null,
        previous: null,
        results: [film],
    };

    beforeEach(() => {
        repository = {
            getListStarwars: jest.fn(),
            getStarwarsById: jest.fn(),
        };
        service = new StarWarsService(repository);
    });

    it('returns the repository list of external films', async () => {
        repository.getListStarwars.mockResolvedValue(films);

        await expect(service.getListStarwars()).resolves.toBe(films);
        expect(repository.getListStarwars).toHaveBeenCalledTimes(1);
    });

    it('returns an external film by ID and forwards the ID', async () => {
        repository.getStarwarsById.mockResolvedValue(film);

        await expect(service.getStarwarsById(1)).resolves.toBe(film);
        expect(repository.getStarwarsById).toHaveBeenCalledWith(1);
    });
});
