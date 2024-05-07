import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entitiy';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly TaskRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const findTask = await this.TaskRepository.findOneBy({ name: createTaskDto.name });
    if (findTask) {
      throw new ConflictException('Task name already exists');
    }
    const Task = this.TaskRepository.create(createTaskDto);
    return this.TaskRepository.save(Task);
  }

  async findAll(): Promise<Task[]> {
    return this.TaskRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    const Task = await this.TaskRepository.findOneBy({ id });
    if (!Task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return Task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const Task = await this.findOne(id);
    Object.assign(Task, updateTaskDto);
    return this.TaskRepository.save(Task);
  }

  async remove(id: number): Promise<void> {
    const result = await this.TaskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
