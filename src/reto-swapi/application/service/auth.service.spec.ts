import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { AuthService } from './auth.service';
import { UserAlreadyExistsError } from '../../domain/repository/authentication.repository';
import type { AuthenticationRepository } from '../../domain/repository/authentication.repository';
import type { AccessTokenProvider } from '../../domain/repository/access-token.provider';

describe('AuthService', () => {
    let authService: AuthService;
    let authenticationRepository: jest.Mocked<AuthenticationRepository>;
    let accessTokenProvider: jest.Mocked<AccessTokenProvider>;

    beforeEach(() => {
        authenticationRepository = {
            createUser: jest.fn(),
            findByEmail: jest.fn(),
        };
        accessTokenProvider = {
            generateToken: jest.fn(),
        };
        authService = new AuthService(authenticationRepository, accessTokenProvider);
    });

    it('registers a normalized user with a bcrypt password hash', async () => {
        authenticationRepository.createUser.mockImplementation(async (user) => ({
            ...user,
            id: 21,
        }));

        await expect(
            authService.register('  Leia Organa ', 'LEIA@EXAMPLE.COM', 'secret-pass'),
        ).resolves.toEqual({
            id: 21,
            name: 'Leia Organa',
            email: 'leia@example.com',
        });

        const [createdUser] = authenticationRepository.createUser.mock.calls[0];
        expect(createdUser.passwordHash).not.toBe('secret-pass');
        await expect(compare('secret-pass', createdUser.passwordHash)).resolves.toBe(true);
    });

    it('rejects duplicate email registration', async () => {
        authenticationRepository.createUser.mockRejectedValue(new UserAlreadyExistsError());

        await expect(
            authService.register('Leia', 'leia@example.com', 'secret-pass'),
        ).rejects.toBeInstanceOf(ConflictException);
    });

    it('rejects passwords that exceed bcrypt byte limits', async () => {
        await expect(
            authService.register('Leia', 'leia@example.com', 'é'.repeat(37)),
        ).rejects.toBeInstanceOf(BadRequestException);
        expect(authenticationRepository.createUser).not.toHaveBeenCalled();
    });

    it('issues a bearer token after valid credentials', async () => {
        const passwordHash = await hash('secret-pass', 4);
        authenticationRepository.findByEmail.mockResolvedValue({
            id: 21,
            uuid: 'user-uuid',
            name: 'Leia Organa',
            email: 'leia@example.com',
            passwordHash,
        });
        accessTokenProvider.generateToken.mockResolvedValue({
            accessToken: 'signed-token',
            expiresIn: 900,
        });

        await expect(authService.login('LEIA@EXAMPLE.COM', 'secret-pass')).resolves.toEqual({
            accessToken: 'signed-token',
            tokenType: 'Bearer',
            expiresIn: 900,
        });
        expect(authenticationRepository.findByEmail).toHaveBeenCalledWith('leia@example.com');
        expect(accessTokenProvider.generateToken).toHaveBeenCalledWith({
            id: 21,
            uuid: 'user-uuid',
            name: 'Leia Organa',
            email: 'leia@example.com',
        });
    });

    it('rejects invalid credentials without issuing a token', async () => {
        authenticationRepository.findByEmail.mockResolvedValue(null);

        await expect(authService.login('leia@example.com', 'wrong')).rejects.toBeInstanceOf(
            UnauthorizedException,
        );
        expect(accessTokenProvider.generateToken).not.toHaveBeenCalled();
    });

    it('rejects non-string credentials', async () => {
        await expect(authService.login("", 'password')).rejects.toBeInstanceOf(
            UnauthorizedException,
        );
        expect(authenticationRepository.findByEmail).not.toHaveBeenCalled();
    });
});
