jest.mock(
    '../../src/reto-swapi/infrastructure/persistence/mysql/query/auth.query',
    () => ({ AuthQueryMysql: class AuthQueryMysql {} }),
);

import { Test, TestingModule } from '@nestjs/testing';
import { AuthUser, RegisterAuthUser } from '../../src/reto-swapi/domain/entities/user-auth';
import { UserAlreadyExistsError } from '../../src/reto-swapi/domain/repository/authentication.repository';
import { AuthQueryMysql } from '../../src/reto-swapi/infrastructure/persistence/mysql/query/auth.query';
import { MysqlAuthenticationRepository } from '../../src/reto-swapi/infrastructure/repository/authentication.repository';

describe('MysqlAuthenticationRepository', () => {
    let module: TestingModule;
    let repository: MysqlAuthenticationRepository;
    let authQuery: {
        createUser: jest.Mock;
        findByEmail: jest.Mock;
    };

    const newUser: RegisterAuthUser = {
        uuid: 'user-uuid',
        name: 'Leia Organa',
        email: 'leia@example.com',
        passwordHash: 'hashed-password',
    };
    const savedUser: AuthUser = { ...newUser, id: 21 };

    beforeEach(async () => {
        authQuery = {
            createUser: jest.fn(),
            findByEmail: jest.fn(),
        };
        module = await Test.createTestingModule({
            providers: [
                MysqlAuthenticationRepository,
                { provide: AuthQueryMysql, useValue: authQuery },
            ],
        }).compile();
        repository = module.get(MysqlAuthenticationRepository);
    });

    afterEach(async () => {
        await module.close();
    });

    it('creates a user through the MySQL query', async () => {
        authQuery.createUser.mockResolvedValue(savedUser);

        await expect(repository.createUser(newUser)).resolves.toEqual(savedUser);
        expect(authQuery.createUser).toHaveBeenCalledWith(newUser);
    });

    it('translates duplicate email errors into UserAlreadyExistsError', async () => {
        authQuery.createUser.mockRejectedValue({ code: 'ER_DUP_ENTRY' });

        await expect(repository.createUser(newUser)).rejects.toBeInstanceOf(
            UserAlreadyExistsError,
        );
    });

    it('rethrows other errors from the MySQL query', async () => {
        const error = new Error('database unavailable');
        authQuery.createUser.mockRejectedValue(error);

        await expect(repository.createUser(newUser)).rejects.toBe(error);
    });

    it('rethrows null errors from the MySQL query', async () => {
        authQuery.createUser.mockRejectedValue(null);

        await expect(repository.createUser(newUser)).rejects.toBeNull();
    });

    it('rethrows non-object errors from the MySQL query', async () => {
        authQuery.createUser.mockRejectedValue('database unavailable');

        await expect(repository.createUser(newUser)).rejects.toBe('database unavailable');
    });

    it('finds a user by email through the MySQL query', async () => {
        authQuery.findByEmail.mockResolvedValue(savedUser);

        await expect(repository.findByEmail('leia@example.com')).resolves.toEqual(savedUser);
        expect(authQuery.findByEmail).toHaveBeenCalledWith('leia@example.com');
    });
});
