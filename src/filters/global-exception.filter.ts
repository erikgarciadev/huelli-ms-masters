import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { QueryFailedError } from 'typeorm';

/** Códigos SQLSTATE de PostgreSQL que representan un conflicto de estado (no un fallo del servidor). */
const PG_CONFLICT_CODES = new Set(['23505' /* unique_violation */, '23503' /* foreign_key_violation */]);

/**
 * Códigos SQLSTATE de PostgreSQL que indican un dato de entrada incompatible con el tipo/regla de la columna:
 * 23502 = not_null_violation, 23514 = check_violation, 22001 = string_data_right_truncation,
 * 22P02 = invalid_text_representation (uuid/número/fecha con formato inválido),
 * 22003 = numeric_value_out_of_range, 22007/22008 = fecha/hora inválida o fuera de rango.
 */
const PG_BAD_INPUT_CODES = new Set(['23502', '23514', '22001', '22P02', '22003', '22007', '22008']);

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger('ExceptionFilter');

  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      response.status(status).json(typeof body === 'string' ? { statusCode: status, message: body } : body);
      return;
    }

    if (exception instanceof QueryFailedError) {
      const qfe = exception as QueryFailedError;
      const code: string | undefined = (exception as any).code;

      this.logger.error(`QueryFailedError [code=${code}] en ${request.method} ${request.originalUrl}: ${qfe.message}`);

      if (code && PG_CONFLICT_CODES.has(code)) {
        response.status(HttpStatus.CONFLICT).json({
          statusCode: HttpStatus.CONFLICT,
          error: 'Conflict',
          message: this.extractConstraintMessage(code, qfe.message),
        });
        return;
      }

      if (code && PG_BAD_INPUT_CODES.has(code)) {
        response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Bad Request',
          message: this.extractBadInputMessage(code, qfe.message),
        });
        return;
      }

      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        error: 'Internal Server Error',
        message: 'Error al procesar la operación en base de datos',
      });
      return;
    }

    this.logger.error(`Excepción no controlada en ${request.method} ${request.originalUrl}`, (exception as any)?.stack);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: 'Internal Server Error',
      message: 'Error interno del servidor',
    });
  }

  private extractConstraintMessage(code: string, raw: string): string {
    const match = raw.match(/constraint "([^"]+)"/i);
    const constraint = match ? match[1] : undefined;
    if (code === '23505') {
      return constraint
        ? `Ya existe un registro con ese valor único (constraint: ${constraint})`
        : 'Ya existe un registro con ese valor único';
    }
    return constraint
      ? `La operación viola una relación de integridad referencial (constraint: ${constraint})`
      : 'La operación viola una relación de integridad referencial';
  }

  private extractBadInputMessage(code: string, raw: string): string {
    const colMatch = raw.match(/column "([^"]+)"/i);
    const column = colMatch ? colMatch[1] : undefined;
    switch (code) {
      case '23502':
        return column ? `El campo '${column}' no puede ser nulo` : 'Un campo obligatorio no puede ser nulo';
      case '23514':
        return 'La operación viola una regla de integridad de datos (check constraint)';
      case '22001':
        return column
          ? `El valor enviado es demasiado largo para el campo '${column}'`
          : 'El valor enviado es demasiado largo para el campo';
      case '22P02':
        return 'El valor enviado no tiene un formato válido (uuid, número o fecha inválidos)';
      case '22003':
        return 'El valor numérico enviado excede el rango permitido para el campo';
      case '22007':
      case '22008':
        return 'El valor de fecha/hora enviado es inválido o está fuera de rango';
      default:
        return 'El valor enviado no es válido para uno de los campos';
    }
  }
}
