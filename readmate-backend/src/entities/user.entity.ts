import { Role } from 'src/auth/enums/role.enum';
import { Book } from './book.entity';

import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToMany(() => Book, (book) => book.associatedUsers)
  @JoinTable()
  userBooks: Book[];
}
