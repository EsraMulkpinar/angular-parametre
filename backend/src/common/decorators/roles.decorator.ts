import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/roles/enum/role.enum';

export const ROLES_KEY = 'role';
export const Roles = (...role: RoleEnum[]) => SetMetadata(ROLES_KEY, role);