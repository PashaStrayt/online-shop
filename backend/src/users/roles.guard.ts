import { CanActivate, ExecutionContext, ForbiddenException, HttpException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { RoleType } from "./types/role.type";
import { ROLES_KEY } from "./roles.decorator";
import { User } from "./users.schema";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) { }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ]);
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const [tokenType, tokenValue] = request.headers.authorization.split(' ');

    if (tokenType?.toLowerCase() !== 'bearer' || !tokenValue) {
      throw new UnauthorizedException({ message: 'Вы не авторизованы' });
    }

    let user: User;
    try {
      user = this.jwtService.verify(tokenValue);
    } catch (error) {
      throw new UnauthorizedException({ message: 'Вы не авторизованы' });
    }
    request.user = user;

    const result = requiredRoles.some(requiredRole => user.roles?.includes(requiredRole));

    if (result) {
      return true;
    } else {
      throw new ForbiddenException({ message: 'Нет доступа' });
    }
  }
}