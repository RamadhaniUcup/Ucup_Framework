
import {
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty({ message: 'Token harus diisi' })
  @IsString()
  readonly token: string;

  @IsNotEmpty({ message: 'Password harus diisi' })
  @IsString()
  @MinLength(8, {
    message: 'Password harus memiliki minimal 8 karakter',
  })
  readonly password: string;

  @IsNotEmpty({ message: 'Konfirmasi password harus diisi' })
  @IsString()
  @MinLength(8, {
    message: 'Konfirmasi password harus memiliki minimal 8 karakter',
  })
  readonly passwordConfirmation: string;
}
