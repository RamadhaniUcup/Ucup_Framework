
import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Book } from './book-entity.js';
import { Author } from '../../authors/entities/author.entity.js';

@Entity('book_authors')
export class BookAuthor {
  @PrimaryColumn({ name: 'book_id', type: 'uuid' })
  bookId: string;

  @PrimaryColumn({ name: 'author_id', type: 'uuid' })
  authorId: string;

  @ManyToOne(() => Book, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'book_id' })
  book: Book;

  @ManyToOne(() => Author, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'author_id' })
  author: Author;
}
