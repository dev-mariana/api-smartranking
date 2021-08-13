import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayerSchema } from './interfaces/player.schema';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    MongooseModule.forFeature([{ name: 'Player', schema: PlayerSchema }])],
  controllers: [PlayersController],
  providers: [PlayersService]
})
export class PlayersModule {}
