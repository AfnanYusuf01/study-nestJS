import { Body, Controller, Get, Post, Query, Param, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service';
import { FilterBookDto } from './dto/filter-book.dto';
import { Book } from './entity/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { UUIDValidationPipe } from '../pipes/uuid-validation.pipe';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async getBooks(@Query() filter: FilterBookDto): Promise<Book[]> {
    return this.booksService.getBooks(filter);
  }
  
  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<void> {
    return this.booksService.createBook(createBookDto);
  }

  @Get('/:id')
  async getBook(@Param('id', UUIDValidationPipe) id: string): Promise<Book> {
    return this.booksService.getBook(id);
  }

  @Put('/:id')
  async updateBook(
    @Param('id', UUIDValidationPipe) id: string, 
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    return this.booksService.updateBook(id, updateBookDto);
  }

  @Delete('/:id')
  async deleteBook(@Param('id', UUIDValidationPipe) id: string): Promise<void> {
    return this.booksService.deleteBook(id);
  }
}
