import { types } from '@hapi/joi';
import { StdioPipe } from 'child_process';
import { Request } from 'express';
import { Application } from 'express';

declare interface PublicRequest extends Request {
  apiKey: string;
}

declare interface RoleRequest extends PublicRequest {
  currentRoleCode: string;
}

declare interface ProtectedRequest extends RoleRequest {
  accessToken: string;
}

export declare interface Tokens {
  accessToken: string;
  refreshToken: string;
}
