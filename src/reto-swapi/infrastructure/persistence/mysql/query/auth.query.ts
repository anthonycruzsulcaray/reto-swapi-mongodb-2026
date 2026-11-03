import { Injectable } from '@nestjs/common';
import type { ServerlessMysql } from 'serverless-mysql';
import { MysqlConfig } from '../connection/mysqlConnect';
import { AuthUser, RegisterAuthUser } from '../../../../domain/entities/user-auth';

interface InsertResult {
    insertId?: number;
}

@Injectable()
export class AuthQueryMysql {
    private readonly connection: ServerlessMysql;

    constructor(mysqlConfig: MysqlConfig) {
        this.connection = mysqlConfig.conn('swapi_auth');
    }

    async createUser(user: RegisterAuthUser): Promise<AuthUser> {
        const transaction = this.connection.transaction();
        transaction.query(
            'INSERT INTO users (uuid, name, email, password_hash) VALUES (?, ?, ?, ?)',
            [user.uuid, user.name, user.email, user.passwordHash],
        );

        const [result] = await transaction.commit<InsertResult>();
        if (!result?.insertId) {
            throw new Error('MySQL did not return an ID for the registered user');
        }

        return { ...user, id: result.insertId };
    }

    async findByEmail(email: string): Promise<AuthUser | null> {
        const users = await this.connection.query<AuthUser[]>(
            'SELECT id, uuid, name, email, password_hash AS passwordHash FROM users WHERE email = ? LIMIT 1',
            [email],
        );
        return users[0] ?? null;
    }
}
