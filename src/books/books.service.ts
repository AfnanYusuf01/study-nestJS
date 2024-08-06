import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './repository/book.repository';
import { FilterBookDto } from './dto/filter-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';
import { DeleteResult } from 'typeorm';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getBooks(filter: FilterBookDto): Promise<Book[]> {
    return this.bookRepository.getBooks(filter);
  }

  async createBook(createBookDto: CreateBookDto): Promise<void> {
    return this.bookRepository.createBook(createBookDto);
  }

  async getBook(id: string): Promise<Book> {
    const found = await this.bookRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
    return found;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.getBook(id);

    Object.assign(book, updateBookDto);
    await this.bookRepository.save(book);

    return book;
  }

  async deleteBook(id: string): Promise<void> {
    const result: DeleteResult = await this.bookRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID "${id}" not found`);
    }
  }
}
