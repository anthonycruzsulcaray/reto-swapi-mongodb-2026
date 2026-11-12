import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../../application/service/auth.service';
import { ACCESS_TOKEN_PROVIDER } from '../../domain/repository/access-token.provider';
import { AUTHENTICATION_REPOSITORY } from '../../domain/repository/authentication.repository';
import { MysqlAuthenticationRepository } from '../repository/authentication.repository';
import { JwtAccessTokenProvider } from '../service/jwt-access-token.provider';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { MysqlModule } from './mysql.module';

@Module({
    imports: [
        MysqlModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                secret: configService.getOrThrow<string>('auth.jwtSecret'),
                signOptions: {
                    algorithm: 'HS256',
                    expiresIn: configService.getOrThrow<number>('auth.jwtExpirationSeconds'),
                },
            }),
        }),
    ],
    providers: [
        AuthService,
        JwtAuthGuard,
        {
            provide: AUTHENTICATION_REPOSITORY,
            useClass: MysqlAuthenticationRepository,
        },
        {
            provide: ACCESS_TOKEN_PROVIDER,
            useClass: JwtAccessTokenProvider,
        },
    ],
    exports: [AuthService, JwtAuthGuard, JwtModule],
})
export class AuthModule {}
