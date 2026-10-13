import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';



export class RegisterDto {
  @IsNotEmpty({ message: 'Name harus diisi' })
  @IsString({ message: 'Name harus berupa string' })
  readonly name: string;

  @IsNotEmpty({ message: 'Email harus diisi' })
  @IsEmail({}, { message: 'Email tidak valid' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password harus diisi' })
  @MinLength(8, { message: 'Password harus memiliki minimal 8 karakter' })
  readonly password: string;

  @IsNotEmpty({ message: 'Konfirmasi password harus diisi' })
  @MinLength(8, { message: 'Konfirmasi password harus memiliki minimal 8 karakter' })
  readonly passwordConfirmation: string;
}