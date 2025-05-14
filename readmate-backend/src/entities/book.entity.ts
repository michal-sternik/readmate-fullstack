import {
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  Entity,
  OneToMany,
} from 'typeorm';

import { User } from './user.entity';
import { UserBook } from './user-book.entity';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'date', nullable: true })
  publishedDate?: string | null;

  @Column({ nullable: true })
  pageCount?: number | null;

  @Column('simple-array')
  authors: string[];

  @Column('simple-array')
  categories: string[];

  @OneToMany(() => UserBook, (userBook) => userBook.book)
  userBooks: UserBook[];
}
