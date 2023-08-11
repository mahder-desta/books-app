import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Books } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books)
    private booksRepository: Repository<Books>,
    private connection: Connection,
  ) {}

  async getAllBooks(
    page: number,
    pageSize: number,
  ): Promise<{ books: Books[]; total: number }> {
    const [books, total] = await this.booksRepository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
    });

    return { books, total };
  }

  async getBookById(id: number): Promise<Books> {
    return this.booksRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createBook(book: Partial<Books>): Promise<Books> {
    return this.booksRepository.save(book);
  }

  async updateBook(id: number, book: Partial<Books>): Promise<Books> {
    await this.booksRepository.update(id, book);
    return this.getBookById(id);
  }

  async deleteBook(id: number): Promise<void> {
    await this.booksRepository.delete(id);
  }

  async buyBook(id: number): Promise<Books> {
    // Start a transaction
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // Find the book by ID
      const book = await queryRunner.manager
        .createQueryBuilder(Books, 'book')
        .where('book.id = :id', { id })
        .getOne();

      // If the book is not found, throw a NotFoundException
      if (!book) {
        throw new NotFoundException('Book not found');
      }

      // Implement update  logic
      // For example, you can update the book's stock and perform other operations
      book.description = 'new description';
      // Commit the transaction
      await queryRunner.commitTransaction();

      return book;
    } catch (error) {
      // If an error occurs, rollback the transaction
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      // Release the query runner
      await queryRunner.release();
    }
  }
}
