
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Book } from './book-entity.js';
import { createBookDto } from './dto/create-book-dto.js';
import { Author } from '../entity/author.entity.js';
import { Publisher } from '../entity/publisher.entity.js';
import { Category } from '../entity/categories.entity.js';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,

    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,

    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Mengambil semua data buku
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      relations: {
        author: true,
        publisher: true,
        category: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });
  }

  // Mengambil data buku berdasarkan ID
  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: {
        author: true,
        publisher: true,
        category: true,
      },
    });

    if (!book) {
      throw new NotFoundException(
        `Buku dengan ID ${id} tidak ditemukan`,
      );
    }

    return book;
  }

  // Menambahkan buku baru
  async create(bookDto: createBookDto): Promise<Book> {
    const author = await this.authorRepository.findOneBy({
      id: bookDto.authorId,
    });

    const publisher = await this.publisherRepository.findOneBy({
      id: bookDto.publisherId,
    });

    const category = await this.categoryRepository.findOneBy({
      id: bookDto.categoryId,
    });

    if (!author) {
      throw new NotFoundException('Penulis tidak ditemukan');
    }

    if (!publisher) {
      throw new NotFoundException('Penerbit tidak ditemukan');
    }

    if (!category) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }

    const newBook = this.bookRepository.create({
      name: bookDto.name,
      authorLegacy: author.name,
      isbn: bookDto.isbn,
      publishedYear: bookDto.publishedYear,
      price: 0,
      stock: 0,
      isAvailable: true,
      author,
      publisher,
      category,
    });

    try {
      const savedBook = await this.bookRepository.save(newBook);
      return this.findOne(savedBook.id);
    } catch (error) {
      if ((error as { code?: string }).code === '23505') {
        throw new BadRequestException('ISBN sudah terdaftar');
      }

      throw error;
    }
  }

  // Memperbarui data buku
  async update(
    id: string,
    bookDto: createBookDto,
  ): Promise<Book> {
    const book = await this.findOne(id);

    const author = await this.authorRepository.findOneBy({
      id: bookDto.authorId,
    });

    const publisher = await this.publisherRepository.findOneBy({
      id: bookDto.publisherId,
    });

    const category = await this.categoryRepository.findOneBy({
      id: bookDto.categoryId,
    });

    if (!author) {
      throw new NotFoundException('Penulis tidak ditemukan');
    }

    if (!publisher) {
      throw new NotFoundException('Penerbit tidak ditemukan');
    }

    if (!category) {
      throw new NotFoundException('Kategori tidak ditemukan');
    }

    book.name = bookDto.name;
    book.authorLegacy = author.name;
    book.isbn = bookDto.isbn;
    book.publishedYear = bookDto.publishedYear;
    book.author = author;
    book.publisher = publisher;
    book.category = category;

    try {
      await this.bookRepository.save(book);
    } catch (error) {
      if ((error as { code?: string }).code === '23505') {
        throw new BadRequestException('ISBN sudah terdaftar');
      }

      throw error;
    }

    return this.findOne(book.id);
  }

  // Menghapus buku secara soft delete
  async delete(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.softRemove(book);
  }
}
