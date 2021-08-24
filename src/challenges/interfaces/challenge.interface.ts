import { Player } from './../../players/interfaces/player.interface';
import { ChallengeStatus } from './../enum/challenge-status';
import { Document } from "mongoose";

export class Challenge extends Document {
    dateTimeChallenge: Date;
    status: ChallengeStatus;
    dateTimeRequest: Date;
    dateTimeResponse: Date;
    requester: Player;
    categories: string;
    players: Array<Player>; 
    match: Match;
}

export interface Match extends Document {
    categories: string;
    players: Array<Player>;
    def: Player;
    result: Array<Result>;
}

export interface Result {
    set: string;
}