import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

//*ここにそれぞれのモジュールをimportする
//*各モジュールはControllerとServiceを持つ
//*Controller -> ルーティング処理 post,get,put,deleteを感知して、Serviceに処理を振り分ける
//*Service -> ビジネスロジック Postの処理などを行う

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
