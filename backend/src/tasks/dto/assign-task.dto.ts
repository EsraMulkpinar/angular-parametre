import { IsNotEmpty } from 'class-validator';

export class AssignTaskDto {
  @IsNotEmpty({ message: 'Task name must be a string' })
  id: number;
}
