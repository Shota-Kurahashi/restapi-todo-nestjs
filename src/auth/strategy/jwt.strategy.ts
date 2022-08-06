import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let jwt = null;
          //cookieを使う場合
          if (req && req.cookies) {
            jwt = req.cookies['access_token'];
          }
          return jwt;
        },
      ]),
      //jwtの有効期限が切れていた場合は、認証に失敗する
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  //overrideするイメージ
  async validate(payload: { sub: number; email: string }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    delete user.hashedPassword;
    return user;
  }
}
