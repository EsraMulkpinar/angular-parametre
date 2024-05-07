import { IsString, IsEmail, IsOptional, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Username must be a string' })
  username?: string;

  @IsOptional()
  @IsString({ message: 'Password must be a string' })
  password?: string;

  @IsOptional()
  @IsEmail({}, { message: 'Invalid email format' })
  email?: string;

  @IsOptional()
  role?: number;

  @IsOptional()
  task?: number;

  
}
