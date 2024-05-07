import { Controller, Post, Body, Delete, Param, Patch, UsePipes, ValidationPipe, Get, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/roles/entity/role.entitiy';
import { RoleEnum } from 'src/roles/enum/role.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@UseGuards(RolesGuard)
@ApiTags("Task")
@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  @Roles(RoleEnum.Admin)
  getAllTaskk(): Promise<Role[]> {
    return this.taskService.findAll();
  }

  @Post("/create")
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
  async updateRole(@Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(id, updateTaskDto);
  }
}
