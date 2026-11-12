
export class JWTValidation {
    constructor() { }

    validateEnvironmentJWTsecret(jwtSecret: string) {
        const jwtSecretValue = jwtSecret;
        if (Buffer.byteLength(jwtSecretValue, 'utf8') < 32) {
            throw new Error('JWT_SECRET must be at least 32 bytes long');
        }
    }

    validateEnvironmentJWTexpirationSeconds(jwtExpirationSeconds: number) {
        if (!Number.isSafeInteger(jwtExpirationSeconds) || jwtExpirationSeconds <= 0) {
            throw new Error('JWT_EXPIRATION_SECONDS must be a positive integer');
        }
    }

}