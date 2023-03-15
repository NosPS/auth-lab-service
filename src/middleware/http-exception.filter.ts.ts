import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    try {
      response
        .status(status)
        .json({
          statusCode: status,
          message: exception.message.replace(/\"/g, ''),
          timestamp: new Date().toLocaleString(),
          path: request.url,
      });
    } catch (error) {
      response
        .status(500)
        .json({
          statusCode: 500,
          message: exception.message,
          path: request.url,
        });
    }
  }
}