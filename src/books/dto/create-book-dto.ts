import { IsNotEmpty, IsInt } from 'class-validator';

export class createBookDto {
    @IsNotEmpty({ message: 'Name harus diisi' })
    readonly name: string;

    @IsNotEmpty({ message: 'Author harus diisi' })
    readonly author: string;

    @IsNotEmpty({ message: 'ISBN harus diisi' })
    readonly isbn: string;

    @IsNotEmpty({ message: 'Tahun terbit harus diisi' })
    @IsInt({ message: 'Tahun terbit harus berupa angka' })
    readonly publishedYear: number;
}