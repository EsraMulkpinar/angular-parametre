import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesController } from './roles.controller';
import { Role } from './entity/role.entitiy';
import { RolesService } from './roles.service';

@Module({
  imports: [TypeOrmModule.forFeature([ Role])],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService]
})
export class UsersModule {}

