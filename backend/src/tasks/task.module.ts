import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from './entity/task.entitiy';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/roles/entity/role.entitiy';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Task, Users, Role])],
  controllers: [TaskController],
  providers: [TaskService, UsersService, JwtService],
  exports: [TaskService],
})
export class TaskModule {}
