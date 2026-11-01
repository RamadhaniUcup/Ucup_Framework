
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class createBookDto {
  @IsNotEmpty({ message: 'Name harus diisi' })
  @IsString()
  readonly name: string;

  @IsNotEmpty({ message: 'Author ID harus diisi' })
  @IsUUID()
  readonly authorId: string;

  @IsNotEmpty({ message: 'Publisher ID harus diisi' })
  @IsUUID()
  readonly publisherId: string;

  @IsNotEmpty({ message: 'Category ID harus diisi' })
  @IsUUID()
  readonly categoryId: string;

  @IsNotEmpty({ message: 'ISBN harus diisi' })
  @IsString()
  readonly isbn: string;

  @IsNotEmpty({ message: 'Tahun terbit harus diisi' })
  @IsInt({ message: 'Tahun terbit harus berupa angka' })
  @Min(1000)
  @Max(2100)
  readonly publishedYear: number;
}
