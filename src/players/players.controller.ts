import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private playersService: PlayersService) {}

    @Post()
    async createAndUpadatePlayer(@Body() playerDto: CreatePlayerDto): Promise<void> {
        await this.playersService.createAndUpadatePlayer(playerDto);
    }

    @Get()
    async getPlayers(@Query('email') email: string): Promise<Player | Player[]> {
        if(email) {
            return await this.playersService.getPlayerByEmail(email);
        } else {
            return await this.playersService.getPlayers();
        }
    }

    @Delete()
    async delete(@Query('email') email: string): Promise<void> {
        this.playersService.delete(email);
    }
}