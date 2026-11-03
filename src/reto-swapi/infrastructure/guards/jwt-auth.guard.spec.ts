import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
    const secret = 'a-secure-test-secret-with-at-least-32-bytes';
    let jwtService: JwtService;
    let guard: JwtAuthGuard;

    beforeEach(() => {
        jwtService = new JwtService({
            secret,
            signOptions: { algorithm: 'HS256' },
        });
        guard = new JwtAuthGuard(jwtService);
    });

    const contextFor = (authorization?: string): ExecutionContext => {
        const request = { headers: { authorization } };
        return {
            switchToHttp: () => ({ getRequest: () => request }),
        } as ExecutionContext;
    };

    it('accepts a correctly signed token and attaches its user claims', async () => {
        const user = {
            id: 21,
            uuid: 'user-uuid',
            name: 'Leia Organa',
            email: 'leia@example.com',
        };
        const token = await jwtService.signAsync(user);
        const context = contextFor(`Bearer ${token}`);

        await expect(guard.canActivate(context)).resolves.toBe(true);
        expect(context.switchToHttp().getRequest().user).toEqual(user);
    });

    it('rejects a missing bearer token', async () => {
        await expect(guard.canActivate(contextFor())).rejects.toBeInstanceOf(
            UnauthorizedException,
        );
    });

    it('rejects a token signed with a different secret', async () => {
        const token = await new JwtService({ secret: 'different-secret' }).signAsync({
            sub: 'user',
        });

        await expect(guard.canActivate(contextFor(`Bearer ${token}`))).rejects.toBeInstanceOf(
            UnauthorizedException,
        );
    });

    it('rejects an expired token', async () => {
        const token = await jwtService.signAsync({
            sub: 'user',
            exp: Math.floor(Date.now() / 1000) - 1,
        });

        await expect(guard.canActivate(contextFor(`Bearer ${token}`))).rejects.toBeInstanceOf(
            UnauthorizedException,
        );
    });

    it('rejects a correctly signed token with missing user claims', async () => {
        const token = await jwtService.signAsync({ id: 21 });

        await expect(guard.canActivate(contextFor(`Bearer ${token}`))).rejects.toBeInstanceOf(
            UnauthorizedException,
        );
    });
});
