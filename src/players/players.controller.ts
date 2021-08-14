import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Player } from './interfaces/player.interface';
import { PlayersValidationParameters } from './pipes/players-validation-parameters.pipe';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {

    constructor(private playersService: PlayersService) {}

    @Get()
    async getPlayers(): Promise<Player[]> {
        return await this.playersService.getPlayers();
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createPlayer(@Body() createPlayerDto: CreatePlayerDto): Promise<Player> {
        return await this.playersService.createPlayer(createPlayerDto);
    }

    @Get(':_id')
    async getPlayerById(@Param('_id', PlayersValidationParameters) _id: string): Promise<Player> {
        return await this.playersService.getPlayerById(_id);
    }

    @Put(':_id')
    @UsePipes(ValidationPipe)
    async updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto, @Param('_id', PlayersValidationParameters) _id: string): Promise<void> {
        await this.playersService.updatePlayer(_id, updatePlayerDto);
    }

    @Delete(':_id')
    async deletePlayer(@Param('_id', PlayersValidationParameters) _id: string): Promise<void> {
        this.playersService.deletePlayer(_id); 
    }
}