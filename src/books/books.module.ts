
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { Book } from './entities/book-entity.js';

import { Author } from '../authors/entities/author.entity.js';
import { Publisher } from '../publishers/entities/publisher.entity.js';
import { Category } from '../categories/entities/categories.entity.js';
import { BookAuthor } from './entities/book-authors.entity.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Book,
      Author,
      Publisher,
      Category,
      BookAuthor,
    ]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
