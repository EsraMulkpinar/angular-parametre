import { Exclude } from 'class-transformer';
import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { Task } from 'src/tasks/entity/task.entitiy';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../../roles/entity/role.entitiy';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  @Length(4, 20, { message: 'Username must be between 4 and 20 characters.' })
  username: string;

  @Column()
  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, {
    message:
      'Password must include at least one uppercase letter, one lowercase letter, and one number.',
  })
  password: string;

  @Column()
  @IsEmail()
  @Length(5, 50, { message: 'Email must be between 5 and 50 characters long.' })
  email: string;

  @ManyToOne(() => Role, (role) => role.users, { cascade: true })
  role: Role;

  @OneToMany(() => Task, (task) => task.user, { eager: true })
  tasks: Task[];

  @Exclude({ toPlainOnly: true })
  @Column({ nullable: true })
  access_token: string;
}
