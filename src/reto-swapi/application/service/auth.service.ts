import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { AUTHENTICATION_REPOSITORY, UserAlreadyExistsError } from '../../domain/repository/authentication.repository';
import { ACCESS_TOKEN_PROVIDER } from '../../domain/repository/access-token.provider';
import type { AuthenticationRepository } from '../../domain/repository/authentication.repository';
import type { AccessTokenProvider } from '../../domain/repository/access-token.provider';
import { PublicAuthUser } from '../../domain/entities/user-auth';
import { AuthTokenResponse } from '../../domain/entities/token-auth';
import * as uuid from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        @Inject(AUTHENTICATION_REPOSITORY)
        private readonly authenticationRepository: AuthenticationRepository,
        @Inject(ACCESS_TOKEN_PROVIDER)
        private readonly accessTokenProvider: AccessTokenProvider,
    ) { }

    async register(name: string, email: string, password: string): Promise<PublicAuthUser> {
        if (Buffer.byteLength(password, 'utf8') > 72) {
            throw new BadRequestException('Password must not exceed 72 bytes');
        }
        const transaction_uuid = uuid.v4();
        const normalizedName = name.trim();
        const normalizedEmail = email.trim().toLowerCase();
        try {
            const passwordHash = await hash(password, 12);
            const user = await this.authenticationRepository.createUser({
                uuid: transaction_uuid,
                name: normalizedName,
                email: normalizedEmail,
                passwordHash,
            });
            const AuthUserResponse: PublicAuthUser = {
                id: user.id,
                uuid: user.uuid,
                name: user.name,
                email: user.email
            }
            return AuthUserResponse;
        } catch (error) {
            if (error instanceof UserAlreadyExistsError) {
                throw new ConflictException('An account with this email already exists');
            }
            throw error;
        }
    }

    async login(email: string, password: string): Promise<AuthTokenResponse> {
        const normalizedEmail = email.trim().toLowerCase();
        const user = await this.authenticationRepository.findByEmail(normalizedEmail);
        if (!user || !(await compare(password, user.passwordHash))) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const token = await this.accessTokenProvider.generateToken({
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
        });
        
        const responseData: AuthTokenResponse = {
            accessToken: token.accessToken,
            tokenType: 'Bearer',
            expiresIn: token.expiresIn,
        }
        return responseData;
    }

}
