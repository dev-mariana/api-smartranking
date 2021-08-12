import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {

    private players: Player[] = [];
    private readonly logger = new Logger(PlayersService.name);

    async createAndUpadatePlayer(playerDto: CreatePlayerDto): Promise<void> {
        const { email } = playerDto;

        const found_player = this.players.find(player => player.email === email);

        if(found_player) {
            return await this.update(found_player, playerDto);
        } else {
            this.create(playerDto);
        }
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const found_player = this.players.find(player => player.email === email);
        
        if(!found_player) {
            throw new NotFoundException(`Player with e-mail ${email} was not found.`);
        }

        return found_player;
    }

    async getPlayers(): Promise<Player[]> {
        return await this.players;
    }

    private create(playerDto: CreatePlayerDto): void {
        const { phoneNumber, email, name } = playerDto;

        const player: Player = {
            _id: uuid(), 
            name, 
            phoneNumber, 
            email, 
            ranking: 'A', 
            rankingPosition: 1, 
            urlPhotoPlayer: 'https://desportolandia.com/sites/default/files/artigos/10-melhores-tenistas-todos-tempos_03.jpg' 
        }

        this.logger.log(`createPlayerDto: ${JSON.stringify(player)}`);
        this.players.push(player);
    } 

    private update(found_player: Player, playerDto: CreatePlayerDto): void {
        const { name } = playerDto;
        found_player.name = name;
    }

    async delete(email: string): Promise<void> {
        const found_player = this.players.find(player => player.email === email);
        this.players = this.players.filter(player => player.email !== found_player.email);
    }
}
