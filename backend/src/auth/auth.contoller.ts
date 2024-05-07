import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { LocalAuthGuard } from 'src/common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Users } from 'src/users/entity/users.entity';
import { GetUserInterceptor } from 'src/common/interceptors/GetUser.interceptor';

@Controller('auth')
@ApiTags('Auth')
@ApiBearerAuth()

export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    return await this.authService.register(payload);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() payload: LoginDto) {
    return await this.authService.login(payload);
  }

  @Delete('/logout')
  @UseInterceptors(GetUserInterceptor)
  async logout(@Req() req: Request) {
    return await this.authService.logout(req.user as Users);
  }
}
