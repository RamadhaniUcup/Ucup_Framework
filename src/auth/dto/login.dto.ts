import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
@IsNotEmpty({ message: 'Email harus diisi' })
@IsEmail({}, { message: 'Email tidak valid' })
readonly email: string;

@IsNotEmpty({ message: 'Password harus diisi' })
@IsString({ message: 'Password harus berupa string' })
readonly password: string;
}