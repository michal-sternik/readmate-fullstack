import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

@Entity()
export class UserBook {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  bookId: string;

  @ManyToOne(() => User, (user) => user.userBooks)
  user: User;

  @ManyToOne(() => Book, (book) => book.userBooks)
  book: Book;

  //@ApiProperty({ example: '2020-11-11' })
  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date', nullable: true })
  endDate?: string | null;
}
