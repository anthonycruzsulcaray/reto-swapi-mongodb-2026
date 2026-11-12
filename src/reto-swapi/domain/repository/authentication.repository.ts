import { AuthUser, RegisterAuthUser } from "../entities/user-auth";

export const AUTHENTICATION_REPOSITORY = Symbol('AUTHENTICATION_REPOSITORY');

export class UserAlreadyExistsError extends Error {
    constructor() {
        super('An account with this email already exists');
        this.name = 'UserAlreadyExistsError';
    }
}

export interface AuthenticationRepository {
    createUser(user: RegisterAuthUser): Promise<AuthUser>;
    findByEmail(email: string): Promise<AuthUser | null>;
}
