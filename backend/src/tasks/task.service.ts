import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entity/task.entitiy';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Users } from 'src/users/entity/users.entity';
import { Repository } from 'typeorm';
import { AssignTaskDto } from './dto/assign-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const findTask = await this.taskRepository.findOneBy({
      name: createTaskDto.name,
    });
    if (findTask) {
      throw new ConflictException('Task name already exists');
    }
    const Task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(Task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const Task = await this.taskRepository.findOneBy({ id });
    if (!Task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return Task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const Task = await this.findOne(id);
    Object.assign(Task, updateTaskDto);
    return this.taskRepository.save(Task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }

  async assignTask(
    userId: number,
    assignTaskDto: AssignTaskDto,
  ): Promise<Users> {
    const foundUser = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!foundUser)
      throw new NotFoundException(`User with ID ${userId} not found`);
    const foundTask = await this.taskRepository.findOne({
      where: { id: assignTaskDto.id },
    });

    if (foundUser?.tasks?.find((task) => task.id === foundTask.id))
      throw new ConflictException('Task already assigned to user');

    const finalTasks: Task[] = foundUser.tasks
      ? [...foundUser.tasks, foundTask]
      : [foundTask];

    return this.usersRepository.save({
      ...foundUser,
      tasks: finalTasks,
    });
  }
}
