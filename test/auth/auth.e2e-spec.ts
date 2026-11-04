jest.mock('uuid', () => ({ v4: () => 'test-uuid' }));

import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AuthService } from '../../src/reto-swapi/application/service/auth.service';
import { AuthController } from '../../src/reto-swapi/infrastructure/controllers/auth.controller';

describe('AuthController endpoints', () => {
    const user = {
        id: 21,
        uuid: 'user-uuid',
        name: 'Leia Organa',
        email: 'leia@example.com',
    };
    const tokenResponse = {
        accessToken: 'signed-access-token',
        tokenType: 'Bearer',
        expiresIn: 900,
    };

    let app: INestApplication;
    let authService: {
        register: jest.Mock;
        login: jest.Mock;
    };

    beforeAll(async () => {
        authService = {
            register: jest.fn(),
            login: jest.fn(),
        };

        const moduleFixture: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [{ provide: AuthService, useValue: authService }],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    beforeEach(() => {
        jest.clearAllMocks();
        authService.register.mockResolvedValue(user);
        authService.login.mockResolvedValue(tokenResponse);
    });

    afterAll(async () => {
        await app.close();
    });

    it('POST /auth/register registers a user', async () => {
        await request(app.getHttpServer())
            .post('/auth/register')
            .send({
                name: 'Leia Organa',
                email: 'leia@example.com',
                password: 'secure-password',
            })
            .expect(201)
            .expect(user);

        expect(authService.register).toHaveBeenCalledWith(
            'Leia Organa',
            'leia@example.com',
            'secure-password',
        );
    });

    it('POST /auth/register rejects invalid data', async () => {
        await request(app.getHttpServer())
            .post('/auth/register')
            .send({ name: '', email: 'not-an-email', password: 'short' })
            .expect(400);

        expect(authService.register).not.toHaveBeenCalled();
    });

    it('POST /auth/login returns a bearer token', async () => {
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'leia@example.com', password: 'secure-password' })
            .expect(200)
            .expect(tokenResponse);

        expect(authService.login).toHaveBeenCalledWith(
            'leia@example.com',
            'secure-password',
        );
    });

    it('POST /auth/login rejects invalid data', async () => {
        await request(app.getHttpServer())
            .post('/auth/login')
            .send({ email: 'not-an-email', password: 'short' })
            .expect(400);

        expect(authService.login).not.toHaveBeenCalled();
    });
});
