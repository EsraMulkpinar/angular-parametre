import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateTaskDto {
  @IsString({ message: 'Task name must be a string' })
  @IsOptional()
  @Length(3, 30, { message: 'Task name must be between 3 and 30 characters' })
  name?: string;
}
