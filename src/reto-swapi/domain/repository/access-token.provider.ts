export const ACCESS_TOKEN_PROVIDER = Symbol('ACCESS_TOKEN_PROVIDER');

export interface AccessTokenPayload {
    id: number;
    uuid: string;
    name: string;
    email: string;
}

export interface AccessTokenProvider {
    generateToken(user: AccessTokenPayload): Promise<{ accessToken: string; expiresIn: number }>;
}
