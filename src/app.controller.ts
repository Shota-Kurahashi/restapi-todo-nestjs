import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//?インスタンス化は必要ない

//*@Controllerの引数にpathを指定することで、ルーティングを行う 例：/root
@Controller('root')
export class AppController {
  //*読み込まれたときにappServiceとして自動でインスタンス化される
  constructor(private readonly appService: AppService) {}

  //*@Getの引数にpathを指定することで、ルーティングを行う 例：/hello
  @Get('hello')
  getHello(): string {
    //*ここにはServiceのgetHelloを呼び出す
    return this.appService.getHello();
  }
}
