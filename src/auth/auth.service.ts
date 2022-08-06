import { Injectable, ForbiddenException, Get, Req } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { Msg, Jwt } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  //*新規登録をする
  async signUp(dto: AuthDto): Promise<Msg> {
    const hashed = await bcrypt.hash(dto.password, 12);

    try {
      await this.prisma.user.create({
        data: {
          email: dto.email,
          hashedPassword: hashed,
        },
      });
      return {
        message: 'ユーザー登録が完了しました',
      };
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('既に登録されているメールアドレスです');
        }
      }
      throw error;
    }
  }

  //*ログインをしてJWTを返す
  async login(dto: AuthDto): Promise<Jwt> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user)
      throw new ForbiddenException(
        'メールアドレスまたはパスワードが間違っています',
      );
    const isValid = await bcrypt.compare(dto.password, user.hashedPassword);
    if (!isValid) throw new ForbiddenException('パスワードが間違っています');
    return this.generateJwt(user.id, user.email);
  }

  //*JWTを生成する
  async generateJwt(userId: number, email: string): Promise<Jwt> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '5m',
      secret,
    });

    return { accessToken: token };
  }
}
