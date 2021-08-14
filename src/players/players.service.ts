import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './interfaces/player.interface';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {

    constructor(@InjectModel('Player') private readonly playerModel: Model<Player>) {}

    async getPlayers(): Promise<Player[]> {
        return await this.playerModel.find().exec();
    }

    async createPlayer(createPlayerDto: CreatePlayerDto): Promise<Player> {
        const { email } = createPlayerDto;

        const found_player = await this.playerModel.findOne({ email }).exec();

        if(found_player) {
            throw new BadRequestException(`The player with e-mail ${email} already exists.`)
        } 

        const created_player = new this.playerModel(createPlayerDto);
        return await created_player.save();
    }

    async getPlayerById(_id: string): Promise<Player> {
        const found_player = await this.playerModel.findOne({ _id }).exec();
        
        if(!found_player) {
            throw new NotFoundException(`Player with id ${_id} was not found.`);
        }

        return found_player;
    }

    async updatePlayer(_id: string, updatePlayerDto: UpdatePlayerDto): Promise<void> {
        const found_player = await this.playerModel.findOne({ _id }).exec();

        if(!found_player) {
            throw new NotFoundException(`The player with id ${_id} not found.`);
        } 

        await this.playerModel.findOneAndUpdate({ _id }, { $set: updatePlayerDto }).exec();
    }

    async deletePlayer(_id: string): Promise<any> {
        const found_player = await this.playerModel.findOne({ _id }).exec();

        if(!found_player) {
            throw new NotFoundException(`The player with id ${_id} not found.`)
        }
        
        return await this.playerModel.deleteOne({ _id }).exec();
    }
}
