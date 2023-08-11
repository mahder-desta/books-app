import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Books } from './entities/book.entity';
import { ApiQuery } from '@nestjs/swagger';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
    description: 'Page number for pagination',
  })
  @ApiQuery({
    name: 'pageSize',
    required: false,
    type: Number,
    description: 'Number of items per page for pagination',
  })
  async getAllBooks(
    @Query('page') page = 1,
    @Query('pageSize') pageSize = 10,
  ): Promise<{ books: Books[]; total: number }> {
    return this.booksService.getAllBooks(page, pageSize);
  }

  @Get(':id')
  async getBookById(@Param('id') id: number): Promise<Books> {
    return this.booksService.getBookById(id);
  }

  @Post()
  async createBook(@Body() book: Partial<Books>): Promise<Books> {
    return this.booksService.createBook(book);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: number,
    @Body() book: Partial<Books>,
  ): Promise<Books> {
    return this.booksService.updateBook(id, book);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: number): Promise<void> {
    return this.booksService.deleteBook(id);
  }
  @Post('buy/:id')
  async buyBook(@Param('id') id: number): Promise<Books> {
    return this.booksService.buyBook(id);
  }
}
