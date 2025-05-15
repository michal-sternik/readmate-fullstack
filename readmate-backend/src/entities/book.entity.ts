import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { UserBook } from './user-book.entity';
@Entity()
export class Book {
  @PrimaryColumn()
  id: string;
  @Column()
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string | null;

  @Column({ type: 'date', nullable: true })
  publishedDate?: string | null;

  @Column({ type: 'integer', nullable: true })
  pageCount?: number | null;

  @Column('simple-array', { nullable: true })
  authors?: string[] | null;

  @Column('simple-array', { nullable: true })
  categories?: string[] | null;

  @Column({ type: 'text', nullable: true })
  link?: string | null;

  @Column({ type: 'text', nullable: true })
  imageLink?: string | null;

  @OneToMany(() => UserBook, (userBook) => userBook.book)
  userBooks: UserBook[];
}
