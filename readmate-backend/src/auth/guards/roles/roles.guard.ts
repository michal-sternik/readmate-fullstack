import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    const request = context
      .switchToHttp()
      .getRequest<{ user?: { id: number; role: Role } }>();
    const user = request.user || { role: Role.GUEST };

    return this.isRoleAllowed(roles, user.role);
  }

  private isRoleAllowed(requiredRoles: Role[], userRoles: Role): boolean {
    //wprowadzamy hierarchię ról, czyli dana rola ma dostep do ról niższych
    const roleHierarchy: Record<Role, Role[]> = {
      [Role.GUEST]: [Role.GUEST],
      [Role.USER]: [Role.GUEST, Role.USER],
      [Role.ADMIN]: [Role.GUEST, Role.USER, Role.ADMIN],
    };

    return requiredRoles.some((requiredRole) =>
      roleHierarchy[userRoles]?.includes(requiredRole),
    );
  }
}
