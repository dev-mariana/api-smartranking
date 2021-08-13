import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    async createAndUpadatePlayer(playerDto: CreatePlayerDto): Promise<void> {
        const { email } = playerDto;

        const found_player = await this.playerModel.findOne({ email }).exec();

        if(found_player) {
           await this.update(playerDto);
        } else {
           await this.create(playerDto);
        }
    }

    async getPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async getPlayerByEmail(email: string): Promise<Player> {
        const found_player = await this.playerModel.findOne({ email }).exec();
        
        if(!found_player) {
            throw new NotFoundException(`Player with e-mail ${email} was not found.`);
        }

        return found_player;
    }

    private async create(playerDto: CreatePlayerDto): Promise<Player> {
        const created_player = new this.playerModel(playerDto);
        return await created_player.save();
    } 

    private async update(playerDto: CreatePlayerDto): Promise<Player> {
        return await this.playerModel.findOneAndUpdate({ email: playerDto.email }, { $set: playerDto }).exec();
    }

    async delete(email: string): Promise<any> {
        return await this.playerModel.remove({ email }).exec();
    }
}
