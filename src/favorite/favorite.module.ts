import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteController } from './favorite.controller';
import { DBService } from 'src/db.service';

@Module({
  controllers: [FavoriteController],
  providers: [FavoriteService, DBService],
})
export class FavoriteModule {}
