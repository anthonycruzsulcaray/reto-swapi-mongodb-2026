import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from "@nestjs/common";
import Joi, { type ObjectSchema } from "joi";

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    errors: Record<string, string> = {
        "any.required": "es requerido",
        "any.unknown": "no está permitido",
        "any.invalid": "contiene un valor erróneo",
        "string.base": "ha de ser una cadena",
        "string.empty": "no puede estar vacío",
        "string.min": "la longitud debe tener al menos {{limit}} caracteres",
        "string.max": "la longitud debe ser menor o igual a {{limit}} caracteres",
        "string.length": "la longitud debe ser de {{limit}} caracteres",
        "string.email": "ha de ser un correo electrónico válido",
        "number.base": "ha de ser un número",
        "number.min": "ha de ser mayor o igual que {{limit}}",
        "number.max": "ha de ser menor o igual que {{limit}}",
        "number.integer": "debe ser un entero",
        "boolean.base": "ha de ser un booleano",
        "array.base": "ha de ser un array",
        "array.min": "debe contener al menos {{limit}} elementos",
        "array.max": "debe contener como máximo {{limit}} elementos",
        "object.base": "ha de ser un objeto",
        "object.unknown": "no está permitido",
    };

    constructor(private readonly schema: ObjectSchema) { }

    transform(value: unknown, _metadata: ArgumentMetadata | string): unknown {
        const { error, value: validatedValue } = this.schema.validate(value, {
            abortEarly: false,
            allowUnknown: true,
            stripUnknown: true,
        });

        if (error) {
            throw new BadRequestException(this.prepareErrorFields(error));
        }

        return validatedValue;
    }

    prepareErrorFields(joiError: Joi.ValidationError): string[] {
        return joiError.details.map((detail) => {
            if (detail.type === "custom") {
                return detail.message;
            }

            const fieldPath = detail.context?.label ?? (detail.path.join(".") || "value");
            const message = this.getErrorMessage(detail.type, this.getErrorLimit(detail));
            return `${fieldPath} ${message}`;
        });
    }

    getErrorLimit(error: Joi.ValidationErrorItem): string | number | undefined {
        const limit = error.context?.limit;
        if (limit === undefined) {
            return undefined;
        }

        if (error.type === "date.min" || error.type === "date.max") {
            const date = new Date(limit);
            if (Number.isNaN(date.getTime())) {
                return String(limit);
            }

            const pad = (part: number) => String(part).padStart(2, "0");
            return `${pad(date.getUTCDate())}-${pad(date.getUTCMonth() + 1)}-${date.getUTCFullYear()} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}`;
        }

        return typeof limit === "string" || typeof limit === "number"
            ? limit
            : String(limit);
    }

    getErrorMessage(errorType: string, limit: string | number | undefined): string {
        const message = this.errors[errorType] ?? "El valor de este campo es incorrecto";
        return message.replace("{{limit}}", limit === undefined ? "" : String(limit));
    }

    assignErrorToField(
        errorMessages: Record<string, unknown>,
        fieldPath: string[],
        message: string,
    ): void {
        if (fieldPath.length === 0) {
            return;
        }

        let current = errorMessages;
        for (const key of fieldPath.slice(0, -1)) {
            const nested = current[key];
            if (typeof nested !== "object" || nested === null || Array.isArray(nested)) {
                current[key] = {};
            }
            current = current[key] as Record<string, unknown>;
        }

        const lastKey = fieldPath[fieldPath.length - 1];
        const existing = current[lastKey];
        if (Array.isArray(existing)) {
            existing.push(message);
        } else if (existing === undefined) {
            current[lastKey] = [message];
        } else {
            current[lastKey] = [existing, message];
        }
    }
}
