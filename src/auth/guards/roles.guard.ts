import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private refrector: Reflector, // decoratorでsetしたメタデータを読み取るために必要
  ) {}

  canActivate(ctx: ExecutionContext): boolean {
    // decoratorでsetしたメタデータをget
    const requiredStatuses = this.refrector.get<string[]>(
      'statuses',
      ctx.getHandler(),
    );
    // decoratorで何も指定されていない時
    if (!requiredStatuses) {
      return true;
    }
    const { user } = ctx.switchToHttp().getRequest();
    // userのstatusがrequiredStatusesのいずれかに一致すればtrueを返す
    return requiredStatuses.some((status) => user.status.includes(status));
  }
}
