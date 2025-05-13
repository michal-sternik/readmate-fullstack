import { PrimaryGeneratedColumn, Column, ManyToMany, Entity } from 'typeorm';

import { User } from './user.entity';
@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => User, (user) => user.userBooks)
  associatedUsers: User[];
}
