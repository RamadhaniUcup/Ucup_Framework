
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Author } from '../entity/author.entity.js';
import { Category } from '../entity/categories.entity.js';
import { Publisher } from '../entity/publisher.entity.js';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 150,
  })
  name: string;

  @Column({
    name: 'author',
    type: 'varchar',
    length: 64,
  })
  authorLegacy: string;

  @Column({
    type: 'varchar',
    length: 20,
    unique: true,
  })
  isbn: string;

  @Column({
    type: 'decimal',
    precision: 12,
    scale: 2,
    default: 0,
  })
  price: number;

  @Column({
    type: 'integer',
    default: 0,
  })
  stock: number;

  @Column({
    name: 'publishedYear',
    type: 'integer',
  })
  publishedYear: number;

  @Column({
    name: 'is_available',
    type: 'boolean',
    default: true,
  })
  isAvailable: boolean;

  @ManyToOne(() => Author, { nullable: false })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @ManyToOne(() => Publisher, { nullable: false })
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @ManyToOne(() => Category, { nullable: false })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date | null;
}
