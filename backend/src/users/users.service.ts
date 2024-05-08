import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Users } from './entity/users.entity';
import { Role } from '../roles/entity/role.entitiy';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  }
  async getAllUsers(): Promise<Users[]> {
    return this.userRepository.find({ relations: ['role'] });
  }
  async findOneByUsername(email: string): Promise<Users | undefined> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
    this.updateUser;
    if (updateUserDto.role) {
      const role = await this.roleRepository.findOneBy({
        name: updateUserDto.role,
      });
      if (!role) {
        throw new NotFoundException(`Role '${updateUserDto.role}' not found.`);
      }
      user.role = role;
      console.log({ role });
    }

    return this.userRepository.save({ ...user, role: user.role });
  }
  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }
  }
  async createUser(createUserDto: CreateUserDto): Promise<Users> {
    const { username, password, email, role } = createUserDto;
    const hashedPassword = await this.hashPassword(password);
    const assignedRole = await this.roleRepository.findOneBy({ name: role });

    const foundUser = this.findOneByUsername(username);
    if (foundUser) {
      throw new BadRequestException(`User already exist.`);
    }
    if (!assignedRole) {
      throw new Error(`Role ${role} not found`);
    }
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      email,
      role: assignedRole,
    });

    return this.userRepository.save(newUser);
  }

  async getProfileFromToken(token: string) {
    if (!token) return null;
    const decodedJwt = this.jwtService.decode(token, { json: true });
    if (!decodedJwt) throw new UnauthorizedException();
    return await this.findOneByUsername(decodedJwt.email);
  }
}
