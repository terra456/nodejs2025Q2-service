import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DBService } from './db.service';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService, DBService],
})
export class AppModule {}
