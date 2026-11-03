import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type {
    AccessTokenPayload,
    AccessTokenProvider,
} from '../../domain/repository/access-token.provider';

@Injectable()
export class JwtAccessTokenProvider implements AccessTokenProvider {
    private readonly expiresIn: number;

    constructor(
        private readonly jwtService: JwtService,
        configService: ConfigService,
    ) {
        this.expiresIn = configService.getOrThrow<number>('auth.jwtExpirationSeconds');
    }

    async generateToken(user: AccessTokenPayload): Promise<{ accessToken: string; expiresIn: number }> {
        const accessToken = await this.jwtService.signAsync(user);
        return { accessToken, expiresIn: this.expiresIn };
    }
}
