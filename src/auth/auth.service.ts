import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto.js';
import { RegisterDto } from './dto/register.dto.js';
import { ForgotPasswordDto } from './dto/forgot-password.dto.js';
import { ResetPasswordDto } from './dto/reset-password.dto.js';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    return {
      message: 'Login berhasil',
      data: loginDto,
    };
  }

  register(registerDto: RegisterDto) {
    return {
      message: 'Register berhasil',
      data: registerDto,
    };
  }

  forgotPassword(forgotPasswordDto: ForgotPasswordDto) {
    return {
      message: 'Link reset password telah dikirim',
      data: forgotPasswordDto,
    };
  }

  resetPassword(resetPasswordDto: ResetPasswordDto) {
    return {
      message: 'Password berhasil diubah',
      data: resetPasswordDto,
    };
  }
}