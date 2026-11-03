import { Injectable } from '@nestjs/common';
import { AuthQueryMysql } from '../persistence/mysql/query/auth.query';
import { UserAlreadyExistsError } from '../../domain/repository/authentication.repository';
import type {
    AuthenticationRepository
} from '../../domain/repository/authentication.repository';
import { AuthUser, RegisterAuthUser } from '../../domain/entities/user-auth';

@Injectable()
export class MysqlAuthenticationRepository implements AuthenticationRepository {
    constructor(private readonly authQuery: AuthQueryMysql) { }

    async createUser(user: RegisterAuthUser): Promise<AuthUser> {
        try {
            return await this.authQuery.createUser(user);
        } catch (error) {
            if (
                typeof error === 'object' &&
                error !== null &&
                'code' in error &&
                error.code === 'ER_DUP_ENTRY'
            ) {
                throw new UserAlreadyExistsError();
            }
            throw error;
        }
    }

    findByEmail(email: string): Promise<AuthUser | null> {
        return this.authQuery.findByEmail(email);
    }
}
