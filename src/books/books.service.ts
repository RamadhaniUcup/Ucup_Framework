import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { createBookDto } from './dto/create-book-dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'; // DIUBAH: Import langsung dari 'typeorm' 

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Mengambil semua data buku
  async findAll(): Promise<Book[]> {
    return this.bookRepository.find({
      order: { createdAt: 'DESC' },
    });
  }
  
  // Mengambil data buku berdasarkan ID
  async findOne(id: string): Promise<Book> {
    const book = await this.bookRepository.findOneBy({ id });
    // Jika buku tidak ditemukan
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  // Menyimpan data buku ke database
  async create(bookDto: createBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(bookDto);
    return this.bookRepository.save(newBook);
  }

  // Mengupdate data buku berdasarkan ID
  async update(id: string, bookDto: createBookDto): Promise<Book> {
    const book = await this.findOne(id);
    Object.assign(book, bookDto);
    return this.bookRepository.save(book);
  }

  // Menghapus data buku berdasarkan ID
  async delete(id: string): Promise<void> {
    const book = await this.findOne(id);
    await this.bookRepository.remove(book);
  }
}
