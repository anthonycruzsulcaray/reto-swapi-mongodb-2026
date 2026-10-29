const { BadRequestException, Injectable } = require('@nestjs/common');

class JoiValidationPipe {
  constructor(schema) {
    this.schema = schema;
  }

  transform(value) {
    const { error, value: validatedValue } = this.schema.validate(value, {
      abortEarly: false,
      allowUnknown: true,
      stripUnknown: true,
    });

    if (error) {
      const messages = error.details.map(({ context, path, type }) => {
        const field = context?.label || path.join('.') || 'value';
        const limit = context?.limit;
        if (type === 'number.min' || type === 'number.integer') {
          return `${field} ${type === 'number.min' ? `debe ser mayor o igual que ${limit}` : 'debe ser un entero'}`;
        }
        if (type === 'any.required') {
          return `${field} es requerido`;
        }
        if (type === 'string.empty' || type === 'string.min') {
          return `${field} no puede estar vacío`;
        }
        return `${field} contiene un valor erróneo`;
      });
      throw new BadRequestException(messages);
    }

    return validatedValue;
  }
}

Injectable()(JoiValidationPipe);

module.exports = { JoiValidationPipe };
