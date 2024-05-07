import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entity/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register({ password, email, ...rest }: RegisterDto) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new ConflictException('Bu email zaten kayıtlı');
    }
    const cryptedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      password: cryptedPassword,
      email,
      ...rest,
    });
    const savedUser = await this.userRepository.save(newUser);
    delete savedUser.password;
    return savedUser;
  }

  async login(payload: LoginDto) {
    const user = await this.validateUser(payload.email, payload.password);
    // console.log(user);
    
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');
    const access_token = this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
    // console.log(access_token);
    
    return await this.userRepository.save({
      ...user,
      access_token,
    });
  }



  async logout(user: Users) {
    if (!user || !user.access_token) {
      throw new BadRequestException('Geçersiz kullanıcı bilgisi.');
    }
    const foundUser = await this.userRepository.findOne({
      where: { access_token: user.access_token },
    });
    if (!foundUser) {
      throw new NotFoundException('Kullanıcı bulunamadı');
    }
  
    const updatedUser = await this.userRepository.save({
      ...foundUser,
      access_token: null,
    });
    return !!updatedUser;
  }
  

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOneByUsername(email);
    if (!user) throw new NotFoundException('Kullanıcı bulunamadı');
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      throw new UnauthorizedException("Couldn't validate user");

    return user;
  }
}