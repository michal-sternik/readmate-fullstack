import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GuestJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any): any {
    //guard for GUEST endpoint, we're not blocking the request without a token
    return user || null;
  }
}
