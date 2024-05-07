import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTaskDto {
  @IsString({ message: 'Task name must be a string' })
  @IsNotEmpty({ message: 'Task name is required' })
  @Length(3, 30, { message: 'Task name must be between 3 and 30 characters' })
  name: string;
}
