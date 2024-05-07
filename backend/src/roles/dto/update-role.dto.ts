import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateRoleDto {
  @IsString({ message: 'Role name must be a string' })
  @IsOptional()
  @Length(3, 30, { message: 'Role name must be between 3 and 30 characters' })
  name?: string;
}
