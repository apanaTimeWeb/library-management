import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface StandardResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: any;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<
  T,
  StandardResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<StandardResponse<T>> {
    return next.handle().pipe(
      map((res) => {
        // If the response is already in the standardized format, pass it through or adjust
        if (res && typeof res === 'object' && 'data' in res) {
          return {
            success: res.success !== undefined ? res.success : true,
            message: res.message || 'Operation successful',
            data: res.data,
            meta: res.meta,
          };
        }

        // Wrap raw returns (arrays, objects) in the standard envelope
        return {
          success: true,
          message: 'Operation successful',
          data: res,
        };
      }),
    );
  }
}
