import { IsEmail, IsOptional, IsString } from 'class-validator';
import { Task } from 'src/tasks/entity/task.entitiy';

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
  role?: string;

  @IsOptional()
  tasks?: Task[];
}
