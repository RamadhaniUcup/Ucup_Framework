import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';

//buat dulu response
export interface StandardResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}


@Injectable()
export class TransformResponeInterceptor <T> implements NestInterceptor <T, StandardResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<StandardResponse<T>> {

    const httpContext = context.switchToHttp();
    const response = httpContext.getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data: T) => ({
        success: true,
        message: 'Request berhasil',
        statusCode: statusCode,
        data: data,
      })),
    );
  }
}


    
  
