import { Controller, Post, Body, Delete, Param, Patch, UsePipes, ValidationPipe, Get, UseGuards, UseInterceptors, Req } from '@nestjs/common';
import { RolesService } from './roles.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entity/role.entitiy';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from './enum/role.enum';
import { GetUserInterceptor } from 'src/common/interceptors/GetUser.interceptor';

@ApiTags("Roles")
@Controller('role')
@ApiBearerAuth()


export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Get()
  @UseInterceptors(GetUserInterceptor)
  @Roles(RoleEnum.Admin)
  getAllRole(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Post("/create")
  @Roles(RoleEnum.Admin)
  createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Delete('delete/:id')
  @Roles(RoleEnum.Admin)
  deleteRole(@Param('id') id: number) {
    return this.rolesService.remove(id);
  }

  @Patch('/update/:id')
  @Roles(RoleEnum.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }
}
