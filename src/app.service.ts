import { Injectable } from '@nestjs/common';

@Injectable()
//*Injectableを付けることで、他のファイルでも使えるようになる
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
