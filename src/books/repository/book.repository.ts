import { Repository, DeleteResult } from 'typeorm';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entity/book.entity';
import { FilterBookDto } from '../dto/filter-book.dto';
import { CreateBookDto } from '../dto/create-book.dto';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(Book)
    private readonly repository: Repository<Book>,
  ) {}

  async getBooks(filter: FilterBookDto): Promise<Book[]> {
    const { title, author, category, min_year, max_year } = filter;

    const query = this.repository.createQueryBuilder('book');

    if (title) {
      query.andWhere('lower(book.title) LIKE :title', {
        title: `%${title.toLowerCase()}%`,
      });
    }

    if (author) {
      query.andWhere('lower(book.author) LIKE :author', {
        author: `%${author.toLowerCase()}%`,
      });
    }

    if (category) {
      query.andWhere('lower(book.category) LIKE :category', {
        category: `%${category.toLowerCase()}%`,
      });
    }

    if (min_year) {
      query.andWhere('book.year >= :min_year', { min_year });
    }

    if (max_year) {
      query.andWhere('book.year <= :max_year', { max_year });
    }

    return await query.getMany();
  }

  async createBook(createBookDto: CreateBookDto): Promise<void> {
    const { title, author, category, year } = createBookDto;

    const book = this.repository.create({
      title,
      author,
      category,
      year,
    });

    try {
      await this.repository.save(book);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async findOne(id: string): Promise<Book> {
    return this.repository.findOne({ where: { id } });
  }

  async save(book: Book): Promise<Book> {
    return this.repository.save(book);
  }

  async delete(id: string): Promise<DeleteResult> {
    return this.repository.delete(id);
  }
}
