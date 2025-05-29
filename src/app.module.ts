import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DBService } from './db.service';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [UserModule, ArtistModule, AlbumModule],
  controllers: [AppController],
  providers: [AppService, DBService],
})
export class AppModule {}
