
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateAuthorDto {
  @IsNotEmpty({ message: 'Nama penulis harus diisi' })
  @IsString()
  @MaxLength(100)
  name: string;

  @IsOptional()
  @IsString()
  biography?: string;
}
