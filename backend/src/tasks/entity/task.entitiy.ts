import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Users } from '../../users/entity/users.entity';
import { IsString } from 'class-validator';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsString()
  name: string;

  @OneToMany(() => Users, user => user.task)
  users: Users;
}

