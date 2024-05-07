import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
  Patch,
  Get,
  UseGuards,
  UseInterceptors,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entity/users.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RoleEnum } from 'src/roles/enum/role.enum';
import { GetUserInterceptor } from 'src/common/interceptors/GetUser.interceptor';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth()

export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @UseInterceptors(GetUserInterceptor)
  @Roles(RoleEnum.Admin)
  async getAllUsers(@Req() req): Promise<Users[]> {
    console.log("req",req.user);
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
