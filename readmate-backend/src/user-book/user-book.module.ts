import { Module } from '@nestjs/common';
import { UserBookService } from './user-book.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserBook } from 'src/entities/user-book.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserBook]), UserModule],
  providers: [UserBookService],
  exports: [UserBookService],
})
export class UserBookModule {}
