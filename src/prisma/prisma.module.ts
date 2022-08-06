import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

//* export -> 他のファイルでimportsするだけで使えるようにする
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
