import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entity/book.entity';  // Sesuaikan dengan nama entity-mu
import { BookRepository } from './repository/book.repository'; // Sesuaikan dengan lokasi repository-mu

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  providers: [BooksService, BookRepository],
  controllers: [BooksController],
})
export class BooksModule {}
