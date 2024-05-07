import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { RolesController } from '../roles/roles.controller';
import { Users } from './entity/users.entity';
import { Role } from '../roles/entity/role.entitiy';
import { RolesService } from '../roles/roles.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Users, Role])],
  controllers: [UsersController, RolesController],
  providers: [UsersService, RolesService,JwtService],
  exports:[UsersService]
})
export class UsersModule {}
