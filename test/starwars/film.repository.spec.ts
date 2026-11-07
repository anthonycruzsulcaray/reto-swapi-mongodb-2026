jest.mock(
    '../../src/reto-swapi/infrastructure/persistence/mongodb/query/film.query',
    () => ({ FilmQueryMongoDB: class FilmQueryMongoDB {} }),
);
jest.mock(
    '../../src/reto-swapi/infrastructure/persistence/mysql/query/film.query',
    () => ({ FilmQueryMysql: class FilmQueryMysql {} }),
);

import { Test, TestingModule } from '@nestjs/testing';
import { FilmBodyEnglish } from '../../src/reto-swapi/domain/entities/film.entities';
import { FilmQueryMongoDB } from '../../src/reto-swapi/infrastructure/persistence/mongodb/query/film.query';
import { FilmQueryMysql } from '../../src/reto-swapi/infrastructure/persistence/mysql/query/film.query';
import { HybridFilmRepository } from '../../src/reto-swapi/infrastructure/repository/film.repository';

describe('HybridFilmRepository', () => {
    const film: FilmBodyEnglish = {
        id: 1,
        episode_id: 4,
        title: 'A New Hope',
        opening_crawl: 'It is a period of civil war.',
        director: 'George Lucas',
        producer: 'Gary Kurtz, Rick McCallum',
        release_date: '1977-05-25',
        characters: ['character-url'],
        planets: ['planet-url'],
        starships: ['starship-url'],
        vehicles: ['vehicle-url'],
        species: ['species-url'],
        created: '1977-05-25T00:00:00.000Z',
        edited: '1977-05-25T00:00:00.000Z',
        url: 'https://swapi.dev/api/films/1/',
    };

    let module: TestingModule;
    let repository: HybridFilmRepository;
    let mongo: {
        getCountTotalFilms: jest.Mock;
        getListFilmsByPaged: jest.Mock;
        findOne: jest.Mock;
        addNewFilm: jest.Mock;
    };
    let mysql: {
        init: jest.Mock;
        addFilm: jest.Mock;
        addFilmCharacters: jest.Mock;
        addFilmPlanets: jest.Mock;
        addFilmStarships: jest.Mock;
        addFilmVehicles: jest.Mock;
        addFilmSpecies: jest.Mock;
    };
    let transaction: {
        commit: jest.Mock;
        rollback: jest.Mock;
    };

    beforeEach(async () => {
        mongo = {
            getCountTotalFilms: jest.fn(),
            getListFilmsByPaged: jest.fn(),
            findOne: jest.fn(),
            addNewFilm: jest.fn(),
        };
        transaction = {
            commit: jest.fn(),
            rollback: jest.fn((callback) => callback(null)),
        };
        mysql = {
            init: jest.fn().mockResolvedValue({ transaction: () => transaction }),
            addFilm: jest.fn((_film, conn) => conn),
            addFilmCharacters: jest.fn((_value, conn) => conn),
            addFilmPlanets: jest.fn((_value, conn) => conn),
            addFilmStarships: jest.fn((_value, conn) => conn),
            addFilmVehicles: jest.fn((_value, conn) => conn),
            addFilmSpecies: jest.fn((_value, conn) => conn),
        };

        module = await Test.createTestingModule({
            providers: [
                HybridFilmRepository,
                { provide: FilmQueryMongoDB, useValue: mongo },
                { provide: FilmQueryMysql, useValue: mysql },
            ],
        }).compile();
        repository = module.get(HybridFilmRepository);
    });

    afterEach(async () => {
        await module.close();
    });

    it('returns the total count and mapped films for the requested page', async () => {
        mongo.getCountTotalFilms.mockResolvedValue(11);
        mongo.getListFilmsByPaged.mockResolvedValue([film]);

        await expect(repository.getListFilmsByPaged(2, 5)).resolves.toEqual({
            count: 11,
            films: [film],
        });
        expect(mongo.getCountTotalFilms).toHaveBeenCalledTimes(1);
        expect(mongo.getListFilmsByPaged).toHaveBeenCalledWith(2, 5);
    });

    it('returns a film by ID and maps the Mongo document', async () => {
        mongo.findOne.mockResolvedValue(film);

        await expect(repository.getFilmById(1)).resolves.toEqual(film);
        expect(mongo.findOne).toHaveBeenCalledWith({ id: 1 });
    });

    it('returns null when the film ID is not found', async () => {
        mongo.findOne.mockResolvedValue(null);

        await expect(repository.getFilmById(999)).resolves.toBeNull();
    });

    it('persists a film and its related values in MySQL before indexing it in MongoDB', async () => {
        transaction.commit.mockResolvedValue([{ insertId: 7 }]);
        const newFilm = { ...film, id: undefined as unknown as number };

        await expect(repository.createFilm(newFilm)).resolves.toEqual({ ...film, id: 7 });

        expect(mysql.addFilm).toHaveBeenCalledWith(newFilm, transaction);
        expect(mysql.addFilmCharacters).toHaveBeenCalledWith('character-url', transaction);
        expect(mysql.addFilmPlanets).toHaveBeenCalledWith('planet-url', transaction);
        expect(mysql.addFilmStarships).toHaveBeenCalledWith('starship-url', transaction);
        expect(mysql.addFilmVehicles).toHaveBeenCalledWith('vehicle-url', transaction);
        expect(mysql.addFilmSpecies).toHaveBeenCalledWith('species-url', transaction);
        expect(transaction.commit).toHaveBeenCalledTimes(1);
        expect(mongo.addNewFilm).toHaveBeenCalledWith({ ...film, id: 7 });
    });

    it('rolls back the MySQL transaction and rethrows persistence errors', async () => {
        const error = new Error('commit failed');
        transaction.commit.mockRejectedValue(error);

        await expect(repository.createFilm({ ...film })).rejects.toBe(error);

        expect(transaction.rollback).toHaveBeenCalledWith(expect.any(Function));
        expect(mongo.addNewFilm).not.toHaveBeenCalled();
    });
});
