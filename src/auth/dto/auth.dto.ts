import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
//!送られてくる型を作るフォルダー
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
