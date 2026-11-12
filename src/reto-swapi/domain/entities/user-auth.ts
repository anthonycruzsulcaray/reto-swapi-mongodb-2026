
export class PublicAuthUser {
    id: number;
    uuid: string;
    name: string;
    email: string;
}

export class AuthUser {
    id: number;
    uuid: string;
    name: string;
    email: string;
    passwordHash: string;
}

export class RegisterAuthUser {
    uuid: string;
    name: string;
    email: string;
    passwordHash: string;
}

export class RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export class LoginRequest {
    email: string;
    password: string;
}