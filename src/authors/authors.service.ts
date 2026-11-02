
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Author } from './entities/author.entity.js';
import { CreateAuthorDto } from './dto/create-author.dto.js';
import { UpdateAuthorDto } from './dto/update-author.dto.js';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOneBy({ id });

    if (!author) {
      throw new NotFoundException(
        `Penulis dengan ID ${id} tidak ditemukan`,
      );
    }

    return author;
  }

  async update(
    id: string,
    updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author> {
    const author = await this.findOne(id);

    Object.assign(author, updateAuthorDto);

    return this.authorRepository.save(author);
  }

  async remove(id: string): Promise<{ message: string }> {
    const author = await this.findOne(id);

    try {
      await this.authorRepository.remove(author);
      return { message: 'Penulis berhasil dihapus' };
    } catch (error) {
      if ((error as { code?: string }).code === '23503') {
        throw new BadRequestException(
          'Penulis tidak dapat dihapus karena masih digunakan oleh data buku',
        );
      }

      throw error;
    }
  }
}
