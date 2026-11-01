
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { Book } from './book-entity.js';

import { Author } from '../entity/author.entity.js';
import { Publisher } from '../entity/publisher.entity.js';
import { Category } from '../entity/categories.entity.js';
import { BookAuthor } from '../entity/book-authors.entity.js';

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
