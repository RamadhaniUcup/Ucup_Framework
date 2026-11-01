import { IsEmail, IsNotEmpty } from 'class-validator';

export class ForgotPasswordDto {
  @IsNotEmpty({ message: 'Email harus diisi' })
  @IsEmail({}, { message: 'Email tidak valid' })
  readonly email: string;
}
