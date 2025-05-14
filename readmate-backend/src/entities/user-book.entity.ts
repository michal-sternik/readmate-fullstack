import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity()
export class UserBook {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userBooks)
  user: User;

  @ManyToOne(() => Book, (book) => book.userBooks)
  book: Book;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate?: string | null;
}
