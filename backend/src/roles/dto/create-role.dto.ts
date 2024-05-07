import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRoleDto {
  @IsString({ message: 'Role name must be a string' })
  @IsNotEmpty({ message: 'Role name is required' })
  @Length(3, 30, { message: 'Role name must be between 3 and 30 characters' })
  name: string;
}
