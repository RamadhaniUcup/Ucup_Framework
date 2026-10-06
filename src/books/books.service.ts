import { Injectable } from '@nestjs/common';
import { Book } from './entities/book-entity.js';
import { createBookDto } from './dto/create-book-dto.js';

@Injectable()
export class BooksService {
  private books: Book[] = [
    {
      id: 1,
      name: 'Buku 1',
      author: 'Author 1',
      isbn: '1234567890',
      publishedYear:2012,
      isAvailable: true,
    },
    {
      id: 2,
      name: 'Buku 2',
      author: 'Author 2',
      isbn: '0987654321',
      publishedYear: 2019,
      isAvailable: true,
    },
  ];


  // mengambil semua data buku
  findAll(): Book[] {
    return this.books;
  }

    // mengambil data buku berdasarkan ID
    findOne(id: number): Book | undefined {
      return this.books.find(book => book.id === id);
    }

    // menyimpan data buku ke database
    create(bookDto: createBookDto): Book {
        const newBook: Book = {
            id: this.books.length + 1,
            name: bookDto.name,
            author: bookDto.author,
            isbn: bookDto.isbn,
            publishedYear: bookDto.publishedYear,
            isAvailable: true,
        };

        //simpan ke database 
        this.books.push(newBook);
        return newBook;
    }

    // mengupdate data buku berdasarkan ID
    update(id: number, book: createBookDto): Book | undefined {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            return undefined; // Buku tidak ditemukan
        }       

        this.books[bookIndex] = { ...this.books[bookIndex], ...book };
        return this.books[bookIndex];
    }
    // menghapus data buku berdasarkan ID
    delete(id: number): boolean {
        const bookIndex = this.books.findIndex(book => book.id === id);
        if (bookIndex === -1) {
            return false; // Buku tidak ditemukan
        }
        this.books.splice(bookIndex, 1);
        return true;
    }
}
