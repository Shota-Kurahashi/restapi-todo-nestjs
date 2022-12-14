import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

//*ここにそれぞれのモジュールをimportする
//*各モジュールはControllerとServiceを持つ
//*Controller -> ルーティング処理 post,get,put,deleteを感知して、Serviceに処理を振り分ける
//*Service -> ビジネスロジック Postの処理などを行う

//*globalをtrueにすることで、configをどこでも使えるようになる
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    TodoModule,
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
