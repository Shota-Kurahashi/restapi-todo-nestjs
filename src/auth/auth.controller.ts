import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  Get,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Csrf, Msg } from './interfaces/auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  //*RequestBodyを使う場合は@Bodyを使う
  signUp(@Body() dto: AuthDto): Promise<Msg> {
    return this.authService.signUp(dto);
  }

  //これを設定しないとcreateの201が返ってしまう
  @HttpCode(HttpStatus.OK)
  @Post('login')
  //*RequestBodyを使う場合は@Bodyを使う
  async login(
    @Body() dto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Msg> {
    const jwt = await this.authService.login(dto);
    res.cookie('access_token', jwt.accessToken, {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });
    return { message: 'ログインしました' };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response): Msg {
    res.cookie('access_token', '', {
      httpOnly: true,
      secure: false, //* true -> httpsのみになる
      sameSite: 'none',
      path: '/',
    });
    return { message: 'ログアウトしました' };
  }
}
