import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { BooksService } from './books.service.js';
import { createBookDto } from './dto/create-book-dto.js';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.findAll();
  }

  // Mengambil data buku berdasarkan ID.
  @Get(':id')
  getBookById(@Param('id') id: string) {
    // Diubah: Langsung kirim 'id' tanpa Number() karena database menggunakan UUID (string)
    return this.booksService.findOne(id);
  }

  // Menampilkan data buku baru ke database
  @Post()
  createBook(@Body() book: createBookDto) {
    return this.booksService.create(book);
  }

  // Mengubah data buku berdasarkan ID
  @Put(':id')
  updateBook(@Param('id') id: string, @Body() book: createBookDto) {
    // Diubah: Langsung kirim 'id' tanpa Number()
    return this.booksService.update(id, book);
  }

  // Menghapus data buku berdasarkan ID
  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    // Diubah: Langsung kirim 'id' tanpa Number()
    return this.booksService.delete(id);
  }
}
