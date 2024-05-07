import { IsNotEmpty, IsEmail, IsString, ValidateNested, IsArray, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  username: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a valid identifier' })
  role: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a valid identifier' })
  task: string;

}
