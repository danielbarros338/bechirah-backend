import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { AppResponse } from '../dtos/appResponse.dto';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data) => {
        const statusCode = response?.statusCode ?? 200;

        // If the handler already returned an AppResponse wrapper, respect it
        if (data && data._isAppResponse === true) {
          const resp = data as AppResponse<any>;
          return {
            message: resp.message,
            data: resp.data ?? null,
            statusCode: resp.statusCode ?? statusCode,
          };
        }

        // Generic payload from use-cases / domain: do not extract `message` from domain objects
        return {
          message: 'Operação realizada com sucesso',
          data: data ?? null,
          statusCode: statusCode,
        };
      }),
    );
  }
}
