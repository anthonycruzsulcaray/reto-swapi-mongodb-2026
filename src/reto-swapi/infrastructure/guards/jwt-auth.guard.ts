import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

interface AuthenticatedRequest extends Request {
    user?: {
        id: number;
        uuid: string;
        name: string;
        email: string;
    };
}

interface JwtPayload {
    id?: number;
    uuid?: string;
    name?: string;
    email?: string;
}

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
        const authorization = request.headers.authorization;
        const bearerToken = authorization?.match(/^Bearer\s+(\S+)$/i)?.[1];

        if (!bearerToken) {
            throw new UnauthorizedException('Bearer token is required');
        }

        let payload: JwtPayload;
        try {
            payload = await this.jwtService.verifyAsync<JwtPayload>(bearerToken, {
                algorithms: ['HS256'],
            });
        } catch (error) {
            if (
                error instanceof Error &&
                ['JsonWebTokenError', 'TokenExpiredError', 'NotBeforeError'].includes(error.name)
            ) {
                throw new UnauthorizedException('Invalid or expired token');
            }

            throw error;
        }

        if (
            typeof payload.id !== 'number' ||
            !Number.isSafeInteger(payload.id) ||
            typeof payload.uuid !== 'string' ||
            typeof payload.name !== 'string' ||
            typeof payload.email !== 'string'
        ) {
            throw new UnauthorizedException('Invalid token');
        }

        request.user = {
            id: payload.id,
            uuid: payload.uuid,
            name: payload.name,
            email: payload.email,
        };
        return true;
    }
}
