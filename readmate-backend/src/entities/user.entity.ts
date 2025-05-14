import { Role } from 'src/auth/enums/role.enum';
import { Book } from './book.entity';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserBook } from './user-book.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  birthDate: string;

  @Column({ type: 'date' })
  createdAt: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @OneToMany(() => UserBook, (userBook) => userBook.user)
  userBooks: UserBook[];
}
