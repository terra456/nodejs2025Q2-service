import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DBService } from 'src/db.service';

@Module({
  controllers: [TrackController],
  providers: [TrackService, DBService],
})
export class TrackModule {}
