
export class EnvNameValidation {
    constructor() { }

    requiredEnvironmentVariable(name: string): string {
        const value = process.env[name];
        if (!value) {
            throw new Error(`${name} environment variable is required`);
        }
        // Puedes generar una clave aleatoria desde la terminal:
        // Generate a random 32-byte hex string for JWT_SECRET using Node.js crypto module
        // node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
        return value;
    };

}