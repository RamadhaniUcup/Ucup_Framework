import { Controller, Get, Param, Post, Body, Put, Delete} from '@nestjs/common';
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
    
    // logic untuk mengambil data buku berdasarkan ID dari database
    return this.booksService.findOne(Number(id));
    
  }

  // menampilkan data buku baru ke database
   @Post()
   createBook(@Body() book:  createBookDto) {

    // logic untuk menyimpan data buku baru ke database
    return this.booksService.create(book);
    
   
}
// mengubah data buku berdasarkan ID
@Put(':id')
  updateBook(@Param('id') id: string, @Body() book: createBookDto) {

    //logic untuk mengupdate data buku berdasarkan ID dari database
    return this.booksService.update(Number(id), book); 
}


@Delete(':id')
  deleteBook(@Param('id') id: string) {
    
    //logic untuk menghapus data buku berdasarkan ID dari database
    return this.booksService.delete(Number(id));
}

}
