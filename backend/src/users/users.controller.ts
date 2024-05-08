import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { GetUserInterceptor } from 'src/common/interceptors/GetUser.interceptor';
import { RoleEnum } from 'src/roles/enum/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entity/users.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('Users')
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseInterceptors(GetUserInterceptor)
  @Roles(RoleEnum.Admin)
  async getAllUsers(): Promise<Users[]> {
    return await this.usersService.getAllUsers();
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/create')
  @Roles(RoleEnum.Admin)
  async create(@Body() createUserDto: CreateUserDto) {
    console.log('Creating user with data:', createUserDto);
    return this.usersService.createUser(createUserDto);
  }

  @Patch('/update/:id')
  @Roles(RoleEnum.Admin)
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete('/delete/:id')
  @Roles(RoleEnum.Admin)
  async delete(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
