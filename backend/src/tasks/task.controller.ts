import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { RoleEnum } from 'src/roles/enum/role.enum';
import { AssignTaskDto } from './dto/assign-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entity/task.entitiy';
import { TaskService } from './task.service';

@UseGuards(RolesGuard)
@ApiTags('Task')
@Controller('task')
@ApiBearerAuth()
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @Roles(RoleEnum.Admin)
  getAllTaskk(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post('/create')
  @Roles(RoleEnum.Admin)
  createRole(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Delete('delete/:id')
  @Roles(RoleEnum.Admin)
  deleteRole(@Param('id') id: number) {
    return this.taskService.remove(id);
  }

  @Patch('/update/:id')
  @Roles(RoleEnum.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateRole(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Patch('/assign/:userId')
  @Roles(RoleEnum.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  async assignTask(
    @Param('userId') userId: number,
    @Body() assignTaskDto: AssignTaskDto,
  ) {
    return this.taskService.assignTask(userId, assignTaskDto);
  }
}
