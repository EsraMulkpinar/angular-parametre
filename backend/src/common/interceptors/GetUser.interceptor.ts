import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Request } from 'express';
  import { Observable } from 'rxjs';
  import { UsersService } from 'src/users/users.service';
  
  @Injectable()
  export class GetUserInterceptor implements NestInterceptor {
    constructor(private userService: UsersService) {}
  
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const request: Request = context.switchToHttp().getRequest();
      const token =
        request.cookies?.['access_token'] ||
        request.headers.authorization?.split(' ')[1];
      const user = await this.userService.getProfileFromToken(token);
      request.user = user;
      console.log(token,"token",user)      
      return next.handle();
    }
  }